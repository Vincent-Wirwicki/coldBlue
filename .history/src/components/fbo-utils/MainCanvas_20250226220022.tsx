import { OrbitControls } from "@react-three/drei";
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
    <div>
    <Canvas
      camera={{
        position: camPos,
        lookAt: () => new Vector3(0, 0, 0),
      }}
      dpr={dpr}
    >
      {children}
      <OrbitControls />
    </Canvas>
  );
};

export default MainCanvas;
