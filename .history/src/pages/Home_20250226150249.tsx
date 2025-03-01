import { Canvas } from "@react-three/fiber";
import SceneFBO from "../components/fbo/SceneFBO";

const Home = ({ txt }: { txt: string }) => {
  return (
    <div>
      <Canvas>
        <SceneFBO />
      </Canvas>
    </div>
  );
};

export default Home;
