import { createPortal } from "@react-three/fiber";
import { FC, ReactNode } from "react";
import { Scene } from "three";

interface Props {
  positions: Float32Array;
  uvs: Float32Array;
  scene: Scene;
  children?: ReactNode;
}

const PortalMesh: FC<Props> = ({ children, scene, positions, uvs }) => {
  return createPortal(
    <mesh>
      {children}
      <planeGeometry args={[]}
    </mesh>,
    scene
  );
};

export default PortalMesh;
