import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import useInitArrays from "./components/fbo/useInitArrays";
import { lazy } from "react";

const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 512;
  const paths = [{ path: "/", title: "home" }];
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });
  // routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout paths={paths} />,
      children: [
        {
          index: true,
          element: (
            <Home
              size={texSize}
              particles={particles}
              pos={random2D}
              offset={random4D}
            />
          ),
        },
        {
          path: "test",
          lazy: () => import("./pages/TestPage"),
        },
      ],
    },
  ]);

  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Layout />}>
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
            path="test"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
