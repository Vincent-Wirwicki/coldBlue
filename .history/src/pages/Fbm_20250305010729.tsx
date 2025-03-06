import MainCanvas from "../components/layout/MainCanvas";
import SceneFBO from "../components/noise/fbm/scene/SceneFBO";

const Fbm = ({
  size,
  pos,
  particles,
  offset,
}: {
  size: number;
  particles: Float32Array;
  pos: Float32Array;
  offset: Float32Array;
}) => {
  return (
    <MainCanvas>
      <SceneFBO size={size} particles={particles} pos={pos} offset={offset} />
    </MainCanvas>
  );
};

export default Fbm;

// const Things = () => {
//   return (
//     <mesh position={[0, -10, -4]} scale={24} rotation={[Math.PI * -0.5, 0, 0]}>
//       {/* <boxGeometry args={[5, 5, 10, 1, 1]} />{" "} */}

//     </mesh>    <MainCanvas camPos={[8, 8, 24]}>
//   );
// };
