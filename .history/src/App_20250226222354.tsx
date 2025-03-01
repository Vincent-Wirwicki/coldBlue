import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";
import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";

const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 512;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  const paths = [{ path: "/", title: "home" }];

  return (
    <>
      <div>
        {" "}
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
          }}
          eventSource={document.getElementById("root")}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      </div>
    </>
  );
};

const ViewBox = () => {
  return <View
};

export default App;
