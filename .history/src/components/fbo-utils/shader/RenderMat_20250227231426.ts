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
        uniform vec3 uColor;
        varying float vDistance;
        varying vec2 vUv;
        varying vec3 vPos;

        float mmax(in float a, in float b, in float c) { return max(a, max(b, c)); }
float mmax(const vec3 v) { return mmax(v.x, v.y, v.z); }
float mmin(in float a, in float b, in float c) { return min(a, min(b, c)); }

float mmin(const vec3 v) { return mmin(v.x, v.y, v.z); }
float rgb2luma(const in vec3 rgb) { return dot(rgb, vec3(0.2126, 0.7152, 0.0722)); }

float luma(in vec3 v) { return rgb2luma(v); }

        vec3 vibrance(in vec3 v, in float vi) {
    float max_v = mmax(v);
    float min_v = mmin(v);
    float sat = max_v - min_v;
    float lum = luma(v);
    return mix(vec3(lum), v, 1.0 + (vi * 1.0 - (sign(vi) * sat)));
}

vec3 contrast(in vec3 v, in float a) { return (v - 0.5 ) * a + 0.5; }
vec3 tonemapFilmic(vec3 v) {
    v = max(vec3(0.0), v - 0.004);
    v = (v * (6.2 * v + 0.5)) / (v * (6.2 * v + 1.7) + 0.06);
    return v;
}
vec3 tonemapACES(vec3 v) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return saturate((v*(a*v+b))/(v*(c*v+d)+e));
}
        void main() {        
          // gl_FragColor = vec4(vec3(0.8),.8);
          float dist = length(gl_PointCoord.xy - vec2(0.5));
          // float dist = length(vDistance - vec2(0.5));
          vec3 color = uColor;
          vec3 v = vibrance(vPos, .725);
          vec3 tone = tonemapACES(vPos) * 1.;
          // v*=0.5;
          gl_FragColor = vec4(vec3(tone),dist);
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
