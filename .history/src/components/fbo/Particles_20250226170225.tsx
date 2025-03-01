import { MutableRefObject, useMemo } from "react";
import { vertRender } from "./shader/render/vertRender";
import { fragRender } from "./shader/render/fragRender";
import { AdditiveBlending, ShaderMaterial } from "three";
import RenderMat from "./shader/render/RenderMat";
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
  size,
  renderMatRef,
}: {
  size: number;
  renderMatRef: MutableRefObject<ShaderMaterial | null>;
}) => {


  const particles = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

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
