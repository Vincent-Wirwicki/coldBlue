import { useMemo, useRef, useState } from "react";
import {
  ShaderMaterial,
  Scene,
  OrthographicCamera,
  RGBAFormat,
  FloatType,
  DataTexture,
} from "three";
import { extend, Object3DNode } from "@react-three/fiber";
import PortalMesh from "../../../fbo/PortalMesh";
import Particles from "../../../fbo/Particles";
import SimMatPeriodic from "../shader/SimMat";
import useInitAndAnimateFBO from "../../../fbo/hooks/useInitAndAnimateFBO";

extend({
  SimMatPeriodic,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    simMatPeriodic: Object3DNode<SimMatPeriodic, typeof SimMatPeriodic>;
  }
}
const SceneFBO = ({
  size = 512,
  //   particles,
  pos,
  offset,
}: {
  size?: number;
  //   particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  // FBO SCENE -----------------------------
  const [scene] = useState(() => new Scene());
  const [cam] = useState(() => new OrthographicCamera(-1, 1, 1, -1, -1, 1));

  //SHADER REF-------------------------------
  const simRef = useRef<ShaderMaterial>(null!);
  const renderRef = useRef<ShaderMaterial>(null!);

  // DATA POINT TEXTURE --------------
  const dataTex = useMemo(
    () => new DataTexture(pos, size, size, RGBAFormat, FloatType),
    [size, pos]
  );
  dataTex.needsUpdate = true;
  //  An other texture with random value as params like speed etc --------
  const offsetTex = useMemo(
    () => new DataTexture(offset, size, size, RGBAFormat, FloatType),
    [offset, size]
  );
  offsetTex.needsUpdate = true;

  useInitAndAnimateFBO(size, scene, cam, simRef, renderRef);

  return (
    <>
      <PortalMesh scene={scene}>
        <simMatPeriodic ref={simRef} args={[dataTex, offsetTex]} />
      </PortalMesh>
      <Particles renderMatRef={renderRef} size={512} />
    </>
  );
};

export default SceneFBO;
