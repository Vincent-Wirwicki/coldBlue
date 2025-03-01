// import { OrbitControls } from "@react-three/drei";
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
      className="w-[512px] h-[512px] border border-neutral-800"
      camera={{
        position: [8, 8, 24],
        lookAt: () => new Vector3(0, 0, 0),
      }}
      dpr={dpr}
    >
      <color attach={"background"} args={["black"]} />

      {children}
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default MainCanvas;
//     <div className="w-[600px] h-[600px] border p-1 border-neutral-800">
