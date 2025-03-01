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
    // depth: true,
    // stencilBuffer: true,
  });
  let targetB = targetA.clone();

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

  //

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

  useFrame(({ gl, clock, }) => {
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

// const shaderMat = useMemo(
//     () => {
//         const shaderMat = class RenderMat extends ShaderMaterial {
//           constructor( size: number) {
//             super({
//               uniforms: {
//                 uPositions: { value: null },
//                 uTime: { value: 0 },
//                 uSize: { value: size },
//               },
//               fragmentShader: /* glsl */ `

//         uniform float uTime;
//         uniform vec3 uColor;
//         varying float vDistance;
//         varying vec2 vUv;
//         varying vec3 vPos;

//         void main() {
//           // gl_FragColor = vec4(vec3(0.8),.8);
//           float dist = length(gl_PointCoord.xy - vec2(0.5)) *0.5;
//           // float dist = length(vDistance - vec2(0.5));

//           vec3 color = uColor;

//           gl_FragColor = vec4(color,1.);
//         }`,

//               vertexShader: /*glsl */ `
//         uniform sampler2D uPositions;
//         uniform float uTime;
//         uniform float uSize;
//         varying vec3 vPos;
//         varying float vDistance;
//         varying vec2 vUv;
//         void main() {
//           vec3 pos = texture2D( uPositions, position.xy ).xyz;
//           vPos = position;
//           vUv = uv;
//           vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.);
//           vDistance = -mvPosition.z;
//           gl_PointSize = uSize * (1./ -mvPosition.z);
//           gl_Position = projectionMatrix * mvPosition;

//         }`,
//             });
//           }
//         };
//         return shaderMat
//     },
//     []
//   );
