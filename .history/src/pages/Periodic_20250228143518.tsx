import MainCanvas from "../components/fbo-utils/MainCanvas";
import SceneFBO from "../components/noise/periodic/scene/SceneFBO";

const Periodic = ({
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
    <MainCanvas camPos={[8, 8, 24]}>
      <color attach={"background"} args={["black"]} />
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Periodic;
