// import { OrbitControls } from "@react-three/drei";
// import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { div } from "motion/react-client";
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
    <div className="w-[512px] h-[512px] border border-neutral-800">
      <Canvas
        camera={{
          position: [8, 8, 22],
          lookAt: () => new Vector3(0, 0, 0),
        }}
        dpr={dpr}
      >
        {/* <PerspectiveCamera
        makeDefault
        manual
        // aspect={1 / 1}
        position={[8, 8, 24]}
        lookAt={() => new Vector3(0, 0, 0)}
      /> */}
        <color attach={"background"} args={["black"]} />

        {children}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default MainCanvas;
//     <div className="w-[600px] h-[600px] border p-1 border-neutral-800">
