import { createPortal } from "@react-three/fiber";
import { FC, ReactNode } from "react";
import { Scene } from "three";

interface Props {
  scene: Scene;
  children?: ReactNode;
}

const PortalMesh: FC<Props> = ({ children, scene }: {scene:Scene}) => {
  return createPortal(
    <mesh>
      {children}
      <planeGeometry args={[2, 2]} />
    </mesh>,
    scene
  );
};

export default PortalMesh;
