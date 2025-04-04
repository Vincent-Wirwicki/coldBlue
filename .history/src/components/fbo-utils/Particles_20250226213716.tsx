import { MutableRefObject } from "react";

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
  renderMatRef,
  particles,
}: {
  particles: Float32Array;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
}) => {
  return (
    <points>
      <renderMat
        ref={renderMatRef}
        // args={[uColor, uSize]}
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
