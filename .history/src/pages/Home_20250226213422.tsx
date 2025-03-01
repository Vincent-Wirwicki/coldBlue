import MainCanvas from "../components/fbo-utils/MainCanvas";
import SceneFBO from "../components/noise/curl/scene/SceneFBO";

const Home = ({
  size = 512,
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
        <SceneFBO size={size}  pos={pos} offset={offset} />
      </MainCanvas>
    </div>
  );
};

export default Home;
