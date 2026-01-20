import { ShaderMaterial } from "three";

export default class RenderMatTest extends ShaderMaterial {
  constructor(uSize: number) {
    super({
      uniforms: {
        uPositions: { value: null },
        uTime: { value: 0 },
        uSize: { value: uSize },
      },
      fragmentShader: /* glsl */ `
        uniform float uTime;
        varying float vDistance;
        varying vec2 vUv;
        varying vec3 vPos;

      vec3 tonemapFilmic(vec3 v) {
          v = max(vec3(0.0), v - 0.004);
          v = (v * (6.2 * v + 0.5)) / (v * (6.2 * v + 1.7) + 0.06);
          return v;
      }
      vec3 fire(float x) { return vec3(1.0, 0.25, 0.0625) * exp(4.0 * x - 1.0); }

      void main() {        
          float dist = length(gl_PointCoord.xy - vec2(0.5));
          vec3 w = fire(vPos.z);
          vec3 tone = tonemapFilmic(w) * .15;
          gl_FragColor = vec4(tone,dist);
        }`,

      vertexShader: /*glsl */ `
        uniform sampler2D uPositions;
        uniform float uTime;
        uniform float uSize;
        varying vec3 vPos;
        varying float vDistance;
        varying vec2 vUv;
        void main() {
          vec3 pos = texture2D( uPositions, position.xy ).xyz;
          vPos = position;
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.);
          vDistance = -mvPosition.z;
          gl_PointSize = uSize * (4./ -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

        }`,
    });
  }
}
