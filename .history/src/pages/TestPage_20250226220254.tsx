import SceneFBO from "../components/noise/periodic/scene/SceneFBO";
import MainCanvas from "../components/fbo-utils/MainCanvas";

const TestPage = ({
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
    <MainCanvas camPos={[0.5, 0.5, 1]}>
      <SceneFBO size={size} pos={pos} offset={offset} particles={particles} />
    </MainCanvas>
  );
};
export default TestPage;

// Component.displayName = "Page";
