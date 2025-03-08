import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";
import Loading from "./components/layout/Loading";

const Curl = lazy(() => import("./pages/Curl"));
const Periodic = lazy(() => import("./pages/Periodic"));
const Simplex = lazy(() => import("./pages/Simplex"));

const App = () => {
  const texSize = 256;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  const paths = [
    { path: "/", title: "pln" },
    { path: "/simplex", title: "slx" },
    { path: "/curl", title: "crl" },
    { path: "/periodic", title: "prd" },
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
              <Suspense fallback={<Loading />}>
                <Curl
                  size={texSize}
                  particles={particles}
                  pos={random2D}
                  offset={random4D}
                />
              </Suspense>
            }
          />
          <Route
            path="/periodic"
            element={
              <Suspense fallback={<Loading />}>
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
              <Suspense fallback={<Loading />}>
                <Simplex
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
