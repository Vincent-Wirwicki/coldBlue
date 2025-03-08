// import { OrbitControls } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/drei";
import { StatsGl, useAspect } from "@react-three/drei";
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
  const scale = useAspect(window.innerWidth, window.innerHeight, 1);
  return (
    <mesh scale={[...scale]} position={[0, 0, -1]}>
      <planeGeometry />
      <meshBasicMaterial color={"red"} />
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
