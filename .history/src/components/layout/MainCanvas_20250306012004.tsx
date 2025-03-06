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
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center col-span-2 ">
      {/* <div className="pt-2 absolute z-10  mix-blend-difference  p-5 w-1/2 h-1/2 uppercase flex justify-center items-center">
        <h3 className="text-8xl text-neutral-800 font-black text-center">
          cold blue
        </h3>
      </div> */}
      <Canvas
        camera={{
          position: [8, 8, 20],
          lookAt: () => new Vector3(0, 0, 0),
        }}
        dpr={dpr}
      >
        <color attach={"background"} args={["black"]} />

        {children}
        <StatsGl />
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
