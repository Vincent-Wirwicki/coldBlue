import { proxy, useSnapshot } from "valtio";

export const params = proxy({
  size: 512,
  rand2d: (size: number) => {
    const total = size * size * 4;
    const random2D = new Float32Array(total);
    for (let i = 0; i < total; i++) {
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
  },
});
