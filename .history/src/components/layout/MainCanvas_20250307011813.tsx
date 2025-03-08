import { OrbitControls } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/drei";
import { StatsGl, useAspect } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useMemo, useRef } from "react";
import { ShaderMaterial, Vector3 } from "three";

const MainCanvas = ({
  children,
  dpr = 2,
}: {
  children: ReactNode;
  dpr?: number;
}) => {
  return (
    <div className="fixed top-0 left-0 z-[-1] w-screen h-screen">
      <Canvas
        camera={{
          position: [4, 4, 24],
          lookAt: () => new Vector3(0, 0, 0),
        }}
        dpr={dpr}
      >
        <color attach={"background"} args={["black"]} />
        {children}
        <StatsGl className="fixed z-10" />
        <BgPlane />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const BgPlane = () => {
  const scale = useAspect(window.innerWidth, window.innerHeight, 2);
  const matRef = useRef<ShaderMaterial>(null!);
  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      frag: /*glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        float Noise21 (vec2 p, float ta, float tb) {
          return fract(sin(p.x*ta+p.y*tb)*5678.);
        }

        void main()
        {
            vec2 uv = vUv;
        
            float t = uTime+123.; // tweak the start moment
            float ta = t*.654321;
            float tb = t*(ta*.123456);

            float c = Noise21(uv, ta, tb) *2. - 1.;
            vec3 col = vec3(c);
        
            gl_FragColor = vec4(col*0.075,1.);
        }`,
      vert: /*glsl */ `           
        varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }`,
    }),
    []
  );

  useFrame(({ clock }) => {
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh scale={[...scale]} position={[0, 0, -10]}>
      <planeGeometry />
      <shaderMaterial
        ref={matRef}
        vertexShader={shader.vert}
        fragmentShader={shader.frag}
        uniforms={shader.uniforms}
      />
    </mesh>
  );
};

export default MainCanvas;
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
