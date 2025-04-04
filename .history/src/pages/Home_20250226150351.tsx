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
    <div>
      <Canvas>
        <SceneFBO particles={} pos={} offset={} />
      </Canvas>
    </div>
  );
};

export default Home;
