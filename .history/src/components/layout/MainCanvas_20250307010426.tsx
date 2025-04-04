// import { OrbitControls } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/drei";
import { StatsGl, useAspect } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useMemo } from "react";
import { Vector3 } from "three";
import { uniform } from "three/webgpu";

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
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

const BgPlane = () => {
  const scale = useAspect(window.innerWidth, window.innerHeight, 2);
  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        frag: /*glsl */ `float Noise21 (vec2 p, float ta, float tb) {
    return fract(sin(p.x*ta+p.y*tb)*5678.);
}
        varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord/iResolution.xy;

    float t = iTime+123.; // tweak the start moment
    float ta = t*.654321;
    float tb = t*(ta*.123456);
    
    float c = Noise21(uv, ta, tb);
    vec3 col = vec3(c);

    fragColor = vec4(col,1.);
}`,
        vert: /*glsl */ `           
        varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }`,
      },
    }),
    []
  );
  return (
    <mesh scale={[...scale]} position={[0, 0, -5]}>
      <planeGeometry />
      <meshBasicMaterial color={"gray"} transparent opacity={0.5} />
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
