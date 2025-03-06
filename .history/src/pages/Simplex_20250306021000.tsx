import MainCanvas from "../components/layout/MainCanvas";
import SceneFBO from "../components/noise/simplex/scene/SceneFBO";

const Simplex = ({
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
      <color attach={"background"} args={["black"]} />
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Simplex;
