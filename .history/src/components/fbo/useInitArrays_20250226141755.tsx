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

  const getRandom2d = (density: number, r1: number, r2: number) => {
    const size = density * density * 4;
    const data = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      const x = Math.random() * r1 - r2;
      const y = Math.random() * r1 - r2;
      const z = 1;
      const w = 1;

      data[stride] = x;
      data[stride + 1] = y;
      data[stride + 2] = z;
      data[stride + 3] = w;
    }
    return data;
  };

  return { particles };
};

export default useInitArrays;
