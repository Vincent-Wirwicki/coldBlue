import { useMemo } from "react";
import { DataTexture, FloatType, RGBAFormat } from "three";

const useTextures = ({
  pos,
  offset,
  size,
}: {
  pos: Float32Array;
  offset: Float32Array;
  size: number;
}) => {
  const dataTex = useMemo(
    () => new DataTexture(pos, size, size, RGBAFormat, FloatType),
    [size, pos]
  );
  dataTex.needsUpdate = true;
  //  An other texture with random value as params like speed etc --------
  const offsetTex = useMemo(
    () => new DataTexture(offset, size, size, RGBAFormat, FloatType),
    [offset, size]
  );
  offsetTex.needsUpdate = true;
};

export default useTextures;
