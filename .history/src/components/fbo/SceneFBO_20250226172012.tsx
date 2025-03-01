import { useMemo, useRef, useState } from "react";
import {
  ShaderMaterial,
  Scene,
  OrthographicCamera,
  RGBAFormat,
  FloatType,
  DataTexture,
} from "three";

import { vertSim } from "./shader/sim/vertSim";
import { fragSim } from "./shader/sim/fragSim";

import PortalMesh from "./PortalMesh";
import Particles from "./Particles";
import useInitAndAnimateFBO from "./useInitAndAnimateFBO";
import MainCanvas from "./MainCanvas";

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

  useInitAndAnimateFBO(size, scene, cam, simRef, renderRef);

  return (
    <>
    <MainCanvas></MainCanvas>
      <PortalMesh scene={scene}>
        <shaderMaterial
          ref={simRef}
          uniforms={shaderSim.uniforms}
          fragmentShader={shaderSim.fragment}
          vertexShader={shaderSim.vertex}
        />
      </PortalMesh>

      <Particles renderMatRef={renderRef} size={512} />
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
