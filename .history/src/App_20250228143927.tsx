import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";

const Curl = lazy(() => import("./pages/Curl"));
const Periodic = lazy(() => import("./pages/Periodic"));
const Simplex = lazy(() => import("./pages/Simplex"));

const App = () => {
  // nav links
  const texSize = 512;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  const paths = [
    { path: "/", title: "home" },
    { path: "/curl", title: "curl" },
    { path: "/periodic", title: "periodic" },
    { path: "/simplex", title: "simplex" },
    // { path: "/", title: "home" },
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
                <Periodic
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
