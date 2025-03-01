import { DataTexture, ShaderMaterial } from "three";

export default class SimMatPeriodic extends ShaderMaterial {
  constructor(pos: DataTexture, offset: DataTexture) {
    super({
      uniforms: {
        uPositions: { value: pos },
        uOffset: { value: offset },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }
      `,
      fragmentShader: /* glsl */ `
            uniform sampler2D uPositions;
      uniform sampler2D uOffset;

      uniform float uTime;
      varying vec2 vUv;  
      #define PI 3.141592653
  

  float psrddnoise(vec2 x, vec2 period, float alpha, out vec2 gradient,
            out vec3 dg) {

    // Transform to simplex space (axis-aligned hexagonal grid)
    vec2 uv = vec2(x.x + x.y*0.5, x.y);

    // Determine which simplex we're in, with i0 being the "base"
    vec2 i0 = floor(uv);
    vec2 f0 = fract(uv);
    // o1 is the offset in simplex space to the second corner
    float cmp = step(f0.y, f0.x);
    vec2 o1 = vec2(cmp, 1.0-cmp);

    // Enumerate the remaining simplex corners
    vec2 i1 = i0 + o1;
    vec2 i2 = i0 + vec2(1.0, 1.0);

    // Transform corners back to texture space
    vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
    vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);

    // Compute vectors from v to each of the simplex corners
    vec2 x0 = x - v0;
    vec2 x1 = x - v1;
    vec2 x2 = x - v2;

    vec3 iu, iv;
    vec3 xw, yw;

    // Wrap to periods, if desired
    if(any(greaterThan(period, vec2(0.0)))) {
      xw = vec3(v0.x, v1.x, v2.x);
      yw = vec3(v0.y, v1.y, v2.y);
      if(period.x > 0.0)
        xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
      if(period.y > 0.0)
        yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
      // Transform back to simplex space and fix rounding errors
      iu = floor(xw + 0.5*yw + 0.5);
      iv = floor(yw + 0.5);
    } else { // Shortcut if neither x nor y periods are specified
      iu = vec3(i0.x, i1.x, i2.x);
      iv = vec3(i0.y, i1.y, i2.y);
    }

    // Compute one pseudo-random hash value for each corner
    vec3 hash = mod(iu, 289.0);
    hash = mod((hash*51.0 + 2.0)*hash + iv, 289.0);
    hash = mod((hash*34.0 + 10.0)*hash, 289.0);

    // Pick a pseudo-random angle and add the desired rotation
    vec3 psi = hash * 0.07482 + alpha;
    vec3 gx = cos(psi);
    vec3 gy = sin(psi);

    // Reorganize for dot products below
    vec2 g0 = vec2(gx.x,gy.x);
    vec2 g1 = vec2(gx.y,gy.y);
    vec2 g2 = vec2(gx.z,gy.z);

    // Radial decay with distance from each simplex corner
    vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
    w = max(w, 0.0);
    vec3 w2 = w * w;
    vec3 w4 = w2 * w2;

    // The value of the linear ramp from each of the corners
    vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));

    // Multiply by the radial decay and sum up the noise value
    float n = dot(w4, gdotx);

    // Compute the first order partial derivatives
    vec3 w3 = w2 * w;
    vec3 dw = -8.0 * w3 * gdotx;
    vec2 dn0 = w4.x * g0 + dw.x * x0;
    vec2 dn1 = w4.y * g1 + dw.y * x1;
    vec2 dn2 = w4.z * g2 + dw.z * x2;
    gradient = 10.9 * (dn0 + dn1 + dn2);

    // Compute the second order partial derivatives
    vec3 dg0, dg1, dg2;
    vec3 dw2 = 48.0 * w2 * gdotx;
    // d2n/dx2 and d2n/dy2
    dg0.xy = dw2.x * x0 * x0 - 8.0 * w3.x * (2.0 * g0 * x0 + gdotx.x);
    dg1.xy = dw2.y * x1 * x1 - 8.0 * w3.y * (2.0 * g1 * x1 + gdotx.y);
    dg2.xy = dw2.z * x2 * x2 - 8.0 * w3.z * (2.0 * g2 * x2 + gdotx.z);
    // d2n/dxy
    dg0.z = dw2.x * x0.x * x0.y - 8.0 * w3.x * dot(g0, x0.yx);
    dg1.z = dw2.y * x1.x * x1.y - 8.0 * w3.y * dot(g1, x1.yx);
    dg2.z = dw2.z * x2.x * x2.y - 8.0 * w3.z * dot(g2, x2.yx);
    dg = 10.9 * (dg0 + dg1 + dg2);

    // Scale the return value to fit nicely into the range [-1,1]
    return 10.9 * n;
  }
float map(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }


      void main(){
      vec2 uv = vUv;
      float time = mod(mod(uTime * 0.15, 1.0) + 1.0, 1.0);
      float time2 = mod(mod(uTime * 0.075, 1.0) + 1.0, 1.0);

      vec4 pos = texture2D(uPositions, uv);
      vec4 offset = texture2D(uOffset, uv);
      float radius= length(pos.xy);
      float angle = atan(pos.x, pos.y);
      vec2 vel = offset.xy;  // Base velocity
      vec3 ip = pos.xyz;

      vec2 grad ;
      vec3 der;
        float timer = mod(uTime * 0.1, 1.0);
        float sc = map(sin(timer*2.*PI), -3.,3.,1.,8.);
      // works well full screen
      float n = psrddnoise(pos.xy * floor(sc) + vec2(1., uTime *0.5) , vec2(2.0), uTime*0.75, grad, der);  
      float curvature = der.x - der.y;
      vec3 d3 = vec3(der);
      float curve = ( curvature*0.01);  
      vec2 nv = normalize(grad);
      float na = atan(grad.x, grad.y);
      vec3 test = normalize(cross(normalize(d3), normalize(pos.xyz)));
      // vel *= na * curv + nv*0.25;
      // pos.xy += vel * n * 0.25;
      vel *= nv + curve;
      pos.xy += vel * n * .75 ;
      // Wrap position within [0,1] space
      pos = mod(pos , 1.);
      // float alpha =  uTime *0.75  ;
      // vec2 period = vec2(1., 1.);

      // float timer2 = mod(uTime * 0.15, 1.0);
      // float sc2 = map(sin(timer2*2.*PI), 0.,1.,.5,1.);
      // float p2 = map(sin(timer2 * timer2 *2.*PI), -2.,2.,1.,6.);
      // float n = psrddnoise(pos.xy * vec2(2.,floor(p2))+ vec2(1., uTime * 0.5)  ,vec2(2.,4.), alpha, grad, der);
      // float curve = ( der.x + der.y)*0.1 ;
      // vec2 zcurl = vec2(grad.x, -grad.y);
      //  vel *= curve ; 
      // pos.xy += n * vel * 0.15  ;
      // // pos.z = exp(-pos.z/radius );
      // pos = mod(pos , 1.);

      // vel *= nv *0.01; 
      // pos.xy += normalize(n)* vel * curv ;
      // Wrap position within [0,1] space
      // pos.xy = mod(pos.xy , 2.);



      gl_FragColor = vec4(pos);
      // float n1 = 0.;
      // float freq = 2.;
      // float amp = 0.5;
      // vec2 gradSum = vec2(0.);
      // for(int i = 0; i < 4; i++){
      //   n1 += psrddnoise(pos.xy*0.1 * freq + gradSum,period, 0.5 * freq * uTime, grad, der);
      //   gradSum += grad * amp;
      //   freq *=2.;
      //   amp*=0.5;
      // }


      }
`,
    });
  }
}
// float test = 0.01;
// vec3 attract;
// float steps;
// float start = 0.;

// start += 0.01;

//   test = map(start, 3.,6.);
//   steps = step(0., test);
//   float A = steps * 0.01;
