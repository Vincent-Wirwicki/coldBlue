import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";

import SceneFBO from "./components/noise/curl/scene/SceneFBO";
import SceneFBOPer from "./components/noise/periodic/scene/SceneFBO";
import MainCanvas from "./components/fbo-utils/MainCanvas";

// const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 256;
  // float 32 for particle pos
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  return (
    <main className="fixed top-0 left-0 w-screen h-screen">
      <MainCanvas>
        <group position={[0, 0, 0]}>
          <SceneFBO
            size={texSize}
            particles={particles}
            pos={random2D}
            offset={random4D}
          />
        </group>
        <group position={[8, 0, 0]}>
          <SceneFBOPer
            size={texSize}
            particles={particles}
            pos={random2D}
            offset={random4D}
          />
        </group>
        <group position={[16, 0, 0]}>
          <SceneFBOPer
            size={texSize}
            particles={particles}
            pos={random2D}
            offset={random4D}
          />
        </group>
      </MainCanvas>
    </main>
  );
};

export default App;
