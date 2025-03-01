import MainCanvas from "../components/layout/MainCanvas";
import SceneFBO from "../components/noise/curl/scene/SceneFBO";

const Curl = ({
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
    <MainCanvas>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Curl;
