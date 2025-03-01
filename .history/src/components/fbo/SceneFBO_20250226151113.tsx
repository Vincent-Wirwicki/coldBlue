import { useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  ShaderMaterial,
  Scene,
  OrthographicCamera,
  NearestFilter,
  RGBAFormat,
  FloatType,
  DataTexture,
} from "three";

import { vertSim } from "./shader/sim/vertSim";
import { fragSim } from "./shader/sim/fragSim";
import { vertRender } from "./shader/render/vertRender";
import { fragRender } from "./shader/render/fragRender";

const SceneFBO = ({
  size = 512,
  particles,
  pos,
  offset,
}: {
  size?: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  // FBO SCENE -----------------------------
  const [scene] = useState(() => new Scene());
  const [cam] = useState(() => new OrthographicCamera(-1, 1, 1, -1, -1, 1));

  //SHADER REF-------------------------------
  const simRef = useRef<ShaderMaterial>(null!);
  const renderRef = useRef<ShaderMaterial>(null!);

  let targetA = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    type: FloatType,
    depth: true,
    stencilBuffer: true,
  });
  let targetB = targetA.clone();
  const getPlane = (density: number, r1: number, r2: number) => {
    const size = density * density * 4;
    const data = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      const theta = 2 * Math.PI * Math.random();
      const r = Math.sqrt(Math.random() * r1 - r2); // Ensures uniform distribution
      const x = Math.random() * r1 - r2;
      const y = Math.random() * r1 - r2;
      const z = 1;
      const w = 1;

      data[stride] = x;
      data[stride + 1] = y;
      data[stride + 2] = z;
      data[stride + 3] = w;
    }
    return data;
  };
  // DATA POINT TEXTURE --------------
  const dataTex = useMemo(
    () => new DataTexture(pos, size, size, RGBAFormat, FloatType),
    [size, pos]
  );
  dataTex.needsUpdate = true;
  //  An other texture with random value as params like speed etc --------
  const offsetTex = useMemo(
    () =>
      new DataTexture(offset, size, size, RGBAFormat, FloatType),
    [offset, size]
  );

  offsetTex.needsUpdate = true;
  // SIM MAT ---------------
  const shaderSim = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uPositions: { value: dataTex },
        uOffset: { value: offsetTex },
      },
      vertex: vertSim,
      fragment: fragSim,
    }),
    [dataTex, offsetTex]
  );

  // RENDER MAT ---------------
  const shaderRender = useMemo(
    () => ({
      uniforms: { uTime: { value: 0 }, uPositions: { value: null } },
      vertex: vertRender,
      fragment: fragRender,
    }),
    []
  );
  //init FBO the texture
  const state = useThree();

  useEffect(() => {
    const { gl } = state;
    gl.setRenderTarget(targetA);
    gl.clear();
    gl.render(scene, cam);
    gl.setRenderTarget(targetB);
    gl.clear();
    gl.render(scene, cam);
    gl.setRenderTarget(null);
  });

  useFrame(({ gl, clock }) => {
    gl.setRenderTarget(targetA);
    gl.clear();
    gl.render(scene, cam);
    gl.setRenderTarget(null);
    simRef.current.uniforms.uTime.value = clock.elapsedTime;
    simRef.current.uniforms.uPositions.value = targetA.texture;
    renderRef.current.uniforms.uPositions.value = targetB.texture;
    // console.log(camera.position); camera
    const temp = targetA;
    targetA = targetB;
    targetB = temp;
  });

  return (
    <>
      {createPortal(
        <mesh scale={1} position={[0, 0, 0]}>
          <shaderMaterial
            ref={simRef}
            uniforms={shaderSim.uniforms}
            fragmentShader={shaderSim.fragment}
            vertexShader={shaderSim.vertex}
          />
          <planeGeometry args={[2, 2]} />
        </mesh>,
        scene
      )}

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
    </>
  );
};

export default SceneFBO;
