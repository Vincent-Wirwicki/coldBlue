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
        position: [4, 4, 18],
        lookAt: () => new Vector3(0, 0, 0),
      }}
      dpr={dpr}
    >
      <color attach={"background"} args={["black"]} />
      {children}
    </Canvas>
  );
};
export default MainCanvas;
