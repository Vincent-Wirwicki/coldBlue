import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";
export const Component = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas>
        <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

Component.displayName = "Page";
