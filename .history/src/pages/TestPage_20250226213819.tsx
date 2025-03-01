import SceneFBO from "../components/noise/periodic/scene/SceneFBO";
import MainCanvas from "../components/fbo-utils/MainCanvas";

const TestPage = ({
  size = 512,
  particles
  pos,
  offset,
}: {
  size?: number;
  particles
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <MainCanvas>
        <SceneFBO size={size} pos={pos} offset={offset} particles={particles} />
      </MainCanvas>
    </div>
  );
};
export default TestPage;

// Component.displayName = "Page";
