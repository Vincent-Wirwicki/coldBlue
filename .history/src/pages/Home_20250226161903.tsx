import SceneFBO from "../components/fbo/SceneFBO";
import { OrbitControls } from "@react-three/drei";
import MainCanvas from "../components/fbo/MainCanvas";

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
      <MainCanvas>
        <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
        <OrbitControls />
      </MainCanvas>
    </div>
  );
};

export default Home;
