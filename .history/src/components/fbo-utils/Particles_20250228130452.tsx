import { MutableRefObject, useState } from "react";

import { AdditiveBlending, ShaderMaterial } from "three";
import RenderMat from "./shader/RenderMat";
import { extend, Object3DNode } from "@react-three/fiber";

extend({
  RenderMat,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    renderMat: Object3DNode<RenderMat, typeof RenderMat>;
  }
}

const Particles = ({
  uSize = 8,
  renderMatRef,
  particles,
}: {
  uSize?: number;
  particles: Float32Array;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
}) => {
  const [positions] = useState(
    () =>
      new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
      ])
  );
  const [uvs] = useState(
    () => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])
  );
  return (
    <points scale={8} position={[0, 0, 0]}>
      <renderMat
        ref={renderMatRef}
        args={[uSize]}
        blending={AdditiveBlending}
        depthWrite={false}
        transparent={false}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
};

export default Particles;
// scale={8} position={[-4, -4, 0]} pos in view
