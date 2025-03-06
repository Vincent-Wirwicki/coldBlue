// import { OrbitControls } from "@react-three/drei";
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
    <div className=" w-1/2 h-1/2 border">
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
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
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
