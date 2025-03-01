import { proxy } from "valtio";

export const store = proxy({
  texSize: 512,
  particleSize: 1,
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
  rand4d: (size: number) => {
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
  },
});
