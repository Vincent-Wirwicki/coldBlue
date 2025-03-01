import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";

import SceneFBO from "./components/noise/curl/scene/SceneFBO";
import SceneFBOPer from "./components/noise/periodic/scene/SceneFBO";
import SceneFBOPerlin from "./components/noise/perlin/scene/SceneFBO";
import SceneFBOSimplex from "./components/noise/simplex/scene/SceneFBO";

import MainCanvas from "./components/fbo-utils/MainCanvas";
import { Scroll, ScrollControls, Stats } from "@react-three/drei";

// const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 512;
  // float 32 for particle pos
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  return (
    <main className="fixed top-0 left-0 w-screen h-screen">
      <MainCanvas camPos={[4.5, 3.5, 11.5]}>
        <ScrollControls pages={2}>
          <Scroll>
            <group position={[0, 0, 0]} scale={0.5}>
              <SceneFBO
                size={texSize}
                particles={particles}
                pos={random2D}
                offset={random4D}
              />
            </group>
            <group position={[0, -10, 0]}>
              <SceneFBOPer
                size={texSize}
                particles={particles}
                pos={random2D}
                offset={random4D}
              />
            </group>
            <group position={[0, -16.5, 0]} scale={0.5}>
              <SceneFBOPerlin
                size={texSize}
                particles={particles}
                pos={random2D}
                offset={random4D}
              />
            </group>
            <group position={[0, -24.5, 0]} scale={0.5}>
              <SceneFBOSimplex
                size={texSize}
                particles={particles}
                pos={random2D}
                offset={random4D}
              />
            </group>
          </Scroll>
        </ScrollControls>
        <Stats />
      </MainCanvas>
    </main>
  );
};

export default App;
