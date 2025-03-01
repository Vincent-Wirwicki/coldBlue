import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { lazy, ReactNode, Suspense } from "react";
import useInitArrays from "./components/fbo-utils/hooks/useInitArrays";
import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import SceneFBO from "./components/noise/curl/scene/SceneFBO";
import SceneFBOPer from "./components/noise/periodic/scene/SceneFBO";
import MainCanvas from "./components/fbo-utils/MainCanvas";

// const Test = lazy(() => import("./pages/TestPage"));

const App = () => {
  // nav links
  const texSize = 512;
  const { particles, random2D, random4D } = useInitArrays({ size: texSize });

  const paths = [{ path: "/", title: "home" }];

  return (
    <MainCanvas>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default App;
