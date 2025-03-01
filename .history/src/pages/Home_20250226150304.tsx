import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";

const Home = ({ txt }: { txt: string }) => {
  return (
    <div>
      <Canvas>
        <SceneFBO   size = 512,
  particles,
  pos,
  offset,/>
      </Canvas>
    </div>
  );
};

export default Home;
