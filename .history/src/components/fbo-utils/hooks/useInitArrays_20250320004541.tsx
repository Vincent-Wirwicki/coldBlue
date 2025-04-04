import { useMemo } from "react";
// A hook that create and fill 32 FLOATarray
const useInitArrays = ({ size = 512 }: { size?: number }) => {
  // like vertices for the points
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
  // random 2d value for positions
  const random2D = useMemo(() => {
    const total = size * size * 4;
    const data = new Float32Array(total);
    const r1 = 2;
    const r2 = 1;
    for (let i = 0; i < total; i++) {
      const stride = i * 4;
      const theta = 2 * Math.PI * Math.random();
      const r = Math.sqrt(Math.random() * r1 - r2); // Ensures uniform distribution
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
  }, [size]);

  // random value to use them as velocity etc
  const random4D = useMemo(() => {
    const total = size * size * 4;
    const random4D = new Float32Array(total * 4);
    for (let i = 0; i < total; i++) {
      const stride = i * 4;
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;
      const w = Math.random() - 0.5;

      random4D[stride] = x;
      random4D[stride + 1] = y;
      random4D[stride + 2] = z;
      random4D[stride + 3] = w;
    }
    return random4D;
  }, [size]);

  return { particles, random2D, random4D };
};

export default useInitArrays;
