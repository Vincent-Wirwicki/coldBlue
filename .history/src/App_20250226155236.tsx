import { Routes, Route, } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import useInitArrays from "./components/fbo/useInitArrays";
import { lazy, Suspense } from "react";

const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 512;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });
  
  const paths = [{ path: "/", title: "home" }];


  return (
    <>
      {" "}
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
            path="/test"
            element={
              <Suspense fallback={<>...</>}>
                <Test
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
