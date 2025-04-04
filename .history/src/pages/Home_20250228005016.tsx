import {
  MeshReflectorMaterial,
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
      <color attach={"background"} args={["gray"]} />
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
    <mesh position={[0, -8, -4]} scale={24} rotation={[Math.PI * -0.5, 0, 0]}>
      {/* <boxGeometry args={[5, 5, 10, 1, 1]} />{" "} */}

      <planeGeometry args={[5, 5, 5]} />
      <MeshReflectorMaterial
        mirror={1}
        // blur={[400, 100]}
        resolution={1024}
        // mixBlur={1}
        mixStrength={15}
        // depthScale={1}
        minDepthThreshold={0.15}
        color="red"
        metalness={0.6}
        roughness={1}
      />
    </mesh>
  );
};
