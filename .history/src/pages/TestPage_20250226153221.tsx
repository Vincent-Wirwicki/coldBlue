import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";
import { OrbitControls } from "@react-three/drei";


export const Component = ({
  size = 512,
  particles,
  pos,
  offset,
}: {
  size?: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
<Scene/>
  );
};

const Scene = ({
  size = 512,
  particles,
  pos,
  offset,
}: {
  size?: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
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
