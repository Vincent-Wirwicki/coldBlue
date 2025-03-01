import { useMemo } from "react";
// A hook that create and fill 32FLOATarray
const useInitArrays = ({ size = 512 }: { size?: number }) => {
  // uv
  const particles = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const random2D = useMemo(() => {
    const length = size * size;
    const random2D = new Float32Array(length);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = 1;
      const w = 1;

      random2D[stride] = x;
      random2D[stride + 1] = y;
      random2D[stride + 2] = z;
      random2D[stride + 3] = w;
    }
    return random2D;
  }, [size]);

  const random2D = useMemo(() => {
    const length = size * size;
    const random2D = new Float32Array(length);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = 1;
      const w = 1;

      random2D[stride] = x;
      random2D[stride + 1] = y;
      random2D[stride + 2] = z;
      random2D[stride + 3] = w;
    }
    return random2D;
  }, [size]);

  return { particles, random2D };
};

export default useInitArrays;
