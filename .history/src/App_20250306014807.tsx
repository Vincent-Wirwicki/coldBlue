import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { lazy, Suspense, useState } from "react";
import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";
import { OrthographicCamera, Scene } from "three";

const Curl = lazy(() => import("./pages/Curl"));
const Periodic = lazy(() => import("./pages/Periodic"));
const Simplex = lazy(() => import("./pages/Simplex"));
const Fbm = lazy(() => import("./pages/Fbm"));

const App = () => {
  // nav links
  const texSize = 256;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });
  const [scene] = useState(() => new Scene());
  const [cam] = useState(() => new OrthographicCamera(-1, 1, 1, -1, -1, 1));
  const paths = [
    { path: "/", title: "perlin" },
    { path: "/simplex", title: "simplex" },
    { path: "/curl", title: "curl" },
    { path: "/fbm", title: "fbm" },
    { path: "/periodic", title: "periodic" },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout paths={paths} />}>
          <Route
            index
            element={
              <Home
                size={texSize}
                particles={particles}
                pos={random2D}
                offset={random4D}
              />
            }
          />
          <Route
            path="/curl"
            element={
              <Suspense fallback={<>...</>}>
                <Curl
                  cam={cam}
                  scene={scene}
                  size={texSize}
                  particles={particles}
                  pos={random2D}
                  offset={random4D}
                />
              </Suspense>
            }
          />{" "}
          <Route
            path="/periodic"
            element={
              <Suspense fallback={<>...</>}>
                <Periodic
                  size={texSize}
                  particles={particles}
                  pos={random2D}
                  offset={random4D}
                />
              </Suspense>
            }
          />
          <Route
            path="/simplex"
            element={
              <Suspense fallback={<>...</>}>
                <Simplex
                  size={texSize}
                  particles={particles}
                  pos={random2D}
                  offset={random4D}
                />
              </Suspense>
            }
          />
          <Route
            path="/fbm"
            element={
              <Suspense fallback={<>...</>}>
                <Fbm
                  size={texSize}
                  particles={particles}
                  pos={random2D}
                  offset={random4D}
                />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
