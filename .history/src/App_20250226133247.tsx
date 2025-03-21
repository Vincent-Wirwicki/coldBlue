import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

const App = () => {
  // nav links
  const paths = [
    { path: "/", title: "home" },

  ];

  // routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout paths={paths} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "disp-gallery-1",
          lazy: () => import("./pages/gallery/displacement/demo1/Page"),
        },
        {
          path: "disp-gallery-2",
          lazy: () => import("./pages/gallery/displacement/demo2/Page"),
        },
        {
          path: "basic-1",
          lazy: () => import("./pages/gallery/basic/Page"),
        },
        {
          path: "abstract-1",
          lazy: () => import("./pages/abstract/Page"),
        },
        {
          path: "bg-1",
          lazy: () => import("./pages/background/Page"),
        },
        {
          path: "bg-color",
          lazy: () => import("./pages/background/color/demo1/Page"),
        },
        {
          path: "bg-color-2",
          lazy: () => import("./pages/background/color/demo2/Page"),
        },
        {
          path: "bg-color-3",
          lazy: () => import("./pages/background/color/demo3/Page"),
        },
        {
          path: "lab",
          lazy: () => import("./pages/abstract/lab/Page"),
        },
        {
          path: "lab-part",
          lazy: () => import("./pages/abstract/particles/Page"),
        },
        {
          path: "lab-fbo",
          lazy: () => import("./pages/abstract/fbo/Page"),
        },
        {
          path: "fibo-loop-1",
          lazy: () => import("./pages/loop/fibo-sphere/demo1/Page"),
        },
        {
          path: "fibo-loop-2",
          lazy: () => import("./pages/loop/fibo-sphere/demo2/Page"),
        },
        {
          path: "fibo-loop-3",
          lazy: () => import("./pages/loop/fibo-sphere/demo3/Page"),
        },
        {
          path: "3d-model-01",
          lazy: () => import("./pages/3d-model/demo01/Page"),
        },
        {
          path: "spiral-wave",
          lazy: () => import("./pages/loop/wave/demo1/Page"),
        },
        {
          path: "catenoid",
          lazy: () => import("./pages/loop/catenoid/demo1/Page"),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;
