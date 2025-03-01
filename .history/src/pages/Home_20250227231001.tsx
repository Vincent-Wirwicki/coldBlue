import { OrbitControls, StatsGl } from "@react-three/drei";
import MainCanvas from "../components/fbo-utils/MainCanvas";
import SceneFBO from "../components/noise/perlin/scene/SceneFBO";

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
    <MainCanvas camPos={[4, 4, 10]}>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
      <OrbitControls />
      <StatsGl />
    </MainCanvas>
  );
};

export default Home;
