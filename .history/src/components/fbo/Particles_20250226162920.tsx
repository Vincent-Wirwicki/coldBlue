import React, { useMemo } from "react";

const Particles = () => {
  const shaderRender = useMemo(
    () => ({
      uniforms: { uTime: { value: 0 }, uPositions: { value: null } },
      vertex: vertRender,
      fragment: fragRender,
    }),
    []
  );
  return (
    <points>
      <shaderMaterial
        ref={renderRef}
        uniforms={shaderRender.uniforms}
        fragmentShader={shaderRender.fragment}
        vertexShader={shaderRender.vertex}
        blending={AdditiveBlending}
        transparent={true}
        depthTest={false}
        depthWrite={false}
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
