import MainCanvas from "../components/layout/MainCanvas";
import SceneFBO from "../components/noise/perlin/scene/SceneFBO";

const Home = ({
  size,
  pos,
  particles,
  offset,
}: {
  size: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
    <MainCanvas>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Home;
