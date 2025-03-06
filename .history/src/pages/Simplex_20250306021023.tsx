import { FC } from "react";
import MainCanvas from "../components/layout/MainCanvas";
import SceneFBO from "../components/noise/simplex/scene/SceneFBO";
import { FBOType } from "../types/FboType";

const Simplex: FC<FBOType> = ({ size, pos, particles, offset }) => {
  return (
    <MainCanvas>
      <color attach={"background"} args={["black"]} />
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Simplex;
