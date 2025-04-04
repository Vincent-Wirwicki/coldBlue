// import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { Vector3 } from "three";

const MainCanvas = ({
  children,
  camPos = [1, 1, 2.5],
  dpr = 2,
}: {
  children: ReactNode;
  camPos?: [number, number, number];
  dpr?: number;
}) => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{
        position: [0.5, 0.5, 5],
        lookAt: () => new Vector3(0, 0, 0),
      }}
      dpr={dpr}
    >
      {children}
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default MainCanvas;
//     <div className="w-[600px] h-[600px] border p-1 border-neutral-800">
