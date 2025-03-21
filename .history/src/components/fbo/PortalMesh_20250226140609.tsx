import { createPortal } from "@react-three/fiber";
import { FC, ReactNode } from "react";
import { Scene } from "three";

interface Props {
  positions: Float32Array;
  uvs: Float32Array;
  scene: Scene;
  children?: ReactNode;
}

const PortalMesh: FC<Props> = ({ children, scene }) => {
  return createPortal(
    <mesh>
      {children}
      <planeGeometry args={[2, 2]} />
    </mesh>,
    scene
  );
};

export default PortalMesh;
