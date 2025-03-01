import { OrbitControls, StatsGl } from "@react-three/drei";
import MainCanvas from "../components/fbo-utils/MainCanvas";
import SceneFBO from "../components/noise/curl/scene/SceneFBO";
import { DoubleSide } from "three";

const Home = ({
  size = 512,
  pos,
  particles,
  offset,
}: {
  size?: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
    <MainCanvas camPos={[8, 8, 24]}>
      <color attach={"background"} args={["black"]} />
      <ambientLight intensity={5} />
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
      <Things />
      <OrbitControls />
      <StatsGl />
    </MainCanvas>
  );
};

export default Home;

const Things = () => {
  return (
    <mesh position={[8, 0, 5]} scale={24} rotation={[0, 0, 0]}>
      {/* <boxGeometry args={[5, 5, 10, 1, 1]} />{" "} */}
      <boxGeometry args={[1, 1.5, 5]} />
      <meshLambertMaterial
        color={"red"}
        side={DoubleSide}
        transparent
        opacity={0.5}
        wireframe
      />
    </mesh>
  );
};
