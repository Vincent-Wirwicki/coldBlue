import { createPortal } from "@react-three/fiber";
import { ReactNode, useState } from "react";
import { Scene } from "three";

const PortalMesh = ({
  children,
  scene,
}: {
  scene: Scene;
  children?: ReactNode;
}) => {
  const [positions] = useState(
    () =>
      new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
      ])
  );
  const [uvs] = useState(
    () => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])
  );
  return createPortal(
    <mesh>
      {children}
      <bufferAttribute
        attach="attributes-positions"
        count={positions.length / 3}
        array={positions}
        itemSize={3}
      />
      <bufferAttribute
        attach="attributes-uv"
        count={uvs.length / 2}
        array={uvs}
        itemSize={2}
      />
    </mesh>,
    scene
  );
};

export default PortalMesh;
