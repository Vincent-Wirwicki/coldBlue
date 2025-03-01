import { OrbitControls } from "@react-three/drei";
import MainCanvas from "../components/fbo-utils/MainCanvas";
import SceneFBO from "../components/noise/periodic/scene/SceneFBO";

const Home = ({
  size = 512,
  pos,
  particles,
  offset,
}: {
  size?: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
    <MainCanvas camPos={[8, 8, 20]}>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
      <OrbitControls />
    </MainCanvas>
  );
};

export default Home;
