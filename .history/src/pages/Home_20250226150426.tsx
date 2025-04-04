import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";

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
      <Canvas>
        <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
      </Canvas>
    </div>
  );
};

export default Home;
