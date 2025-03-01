import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import useInitArrays from "./components/fbo/useInitArrays";

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
          path: "t",
          lazy: () => import("./pages/gallery/displacement/demo1/Page"),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
