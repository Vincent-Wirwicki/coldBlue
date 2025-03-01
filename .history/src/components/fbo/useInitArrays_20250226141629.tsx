import { useMemo } from "react";
// A hook that create and fill 32 FLOAT
const useInitArrays = ({ size = 512 }: { size?: number }) => {
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
  return { particles };
};

export default useInitArrays;
