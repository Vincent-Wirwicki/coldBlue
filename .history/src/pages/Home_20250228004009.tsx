import {
  MeshTransmissionMaterial,
  OrbitControls,
  StatsGl,
} from "@react-three/drei";
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
      <pointLight position={[0, 0, 0]} intensity={5} color={"white"} />
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
    <mesh position={[0, 0, 0.5]} scale={24} rotation={[0, 0, 0]}>
      {/* <boxGeometry args={[5, 5, 10, 1, 1]} />{" "} */}
      <planeGeometry args={[1, 1.5, 5]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.1}
        thickness={0.05}
        chromaticAberration={0.05}
        anisotropicBlur={1}
        clearcoat={1}
        clearcoatRoughness={1}
        envMapIntensity={2}
      />
    </mesh>
  );
};
