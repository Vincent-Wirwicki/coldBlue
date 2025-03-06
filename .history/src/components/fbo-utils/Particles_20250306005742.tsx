import { MutableRefObject } from "react";

import { AdditiveBlending, ShaderMaterial } from "three";
import RenderMat from "./shader/RenderMat";
import { extend, Object3DNode } from "@react-three/fiber";
import { Center } from "@react-three/drei";

extend({
  RenderMat,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    renderMat: Object3DNode<RenderMat, typeof RenderMat>;
  }
}

const Particles = ({
  uSize = 10,
  renderMatRef,
  particles,
}: {
  uSize?: number;
  particles: Float32Array;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
}) => {
  return (
    <Center>
      <points scale={6} position={[0, 0, 0]}>
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
    </Center>
  );
};

export default Particles;
// scale={8} position={[-4, -4, 0]} pos in view
