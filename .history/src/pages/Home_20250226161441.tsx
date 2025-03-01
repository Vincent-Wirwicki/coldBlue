import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";

const Home = ({
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
      <Canvas
        camera={{
          position: [1, 1, 2.5],
          lookAt: () => new Vector3(0, 0, 0),
        }}
      >
        <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Home;
