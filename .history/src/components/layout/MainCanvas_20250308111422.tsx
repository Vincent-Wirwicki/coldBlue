import { OrbitControls } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/drei";
import { StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { Vector3 } from "three";

const MainCanvas = ({
  children,
  dpr = 2,
}: {
  children: ReactNode;
  dpr?: number;
}) => {
  return (
    <Canvas
      camera={{
        position: [4, 4, 20],
        lookAt: () => new Vector3(0, 0, 0),
      }}
      dpr={dpr}
    >
      <color attach={"background"} args={["black"]} />
      {children}
      <StatsGl className="fixed z-10" />
      {/* <BgPlane /> */}
      <OrbitControls />
    </Canvas>
  );
};
export default MainCanvas;
// fixed top-0 left-0 z-[-1] w-screen h-screen
// const BgPlane = () => {
//   const scale = useAspect(window.innerWidth, window.innerHeight, 2);
//   const matRef = useRef<ShaderMaterial>(null!);
//   const shader = useMemo(
//     () => ({
//       uniforms: {
//         uTime: { value: 0 },
//       },
//       frag: /*glsl */ `
//         varying vec2 vUv;
//         varying vec3 vPos;
//         uniform float uTime;
//         float Noise21 (vec2 p, float ta, float tb) {
//           return fract(sin(p.x*ta+p.y*tb)*5678.);
//         }

//         void main()
//         {
//             vec2 uv = vUv;

//             float t = uTime+123.; // tweak the start moment
//             float ta = t*.654321;
//             float tb = t*(ta*.123456);
//             float scanline = sin(vPos.y * 400.0 + u_time * 10.0) * 0.1;

//             float c = Noise21(uv, ta, tb) *2. - 1.;
//             vec3 col = vec3(c) * smoothstep(0.5,0.95, vPos.xy);

//             gl_FragColor = vec4(scanline,1.);
//         }`,
//       vert: /*glsl */ `
//         varying vec2 vUv;
//         varying vec3 vPos;
//           void main() {
//             vUv = uv;
//             vPos = position;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
//           }`,
//     }),
//     []
//   );

//   useFrame(({ clock }) => {
//     matRef.current.uniforms.uTime.value = clock.elapsedTime;
//   });
//   return (
//     <mesh scale={[...scale]} position={[0, 0, -10]}>
//       <planeGeometry />
//       <shaderMaterial
//         ref={matRef}
//         vertexShader={shader.vert}
//         fragmentShader={shader.frag}
//         uniforms={shader.uniforms}
//       />
//     </mesh>
//   );
// };

//     <div className="w-[600px] h-[600px] border p-1 border-neutral-800">
// {
//   /* <PerspectiveCamera
//        makeDefault
//        manual
//        // aspect={1 / 1}
//        position={[8, 8, 24]}
//        lookAt={() => new Vector3(0, 0, 0)}
//      /> */
// }
