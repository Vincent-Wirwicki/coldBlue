import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useState } from "react";
import { Vector3 } from "three";

const MainCanvas = ({
  children,
  dpr = 2,
}: {
  children: ReactNode;
  dpr?: number;
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <Canvas
      camera={{
        position: width > 640 ? [4, 4, 18] : [4, 4, 22],
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
