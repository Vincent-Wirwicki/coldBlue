import { DataTexture, ShaderMaterial } from "three";

export default class SimMatSimplex extends ShaderMaterial {
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


float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < 4; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

    float map(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }
float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
    void main(){
      vec2 uv = vUv;
      float time = mod(mod(uTime *0.15, 1.0) + 1.0, 1.0);
      float time2 = mod(mod(uTime*0.25, 1.0) + 1.0, 1.0);

      float repeat = sin(time * 2. * PI);
      vec4 pos = texture2D( uPositions, uv );
      vec4 offset = texture2D( uOffset, uv );
      vec4 ip = pos;

      float angle = atan(pos.x, pos.y);
      float radius = length(pos.xy);
      vec2 dir = normalize(pos.xy);
      vec2 vel = offset.xy;
      


    float sc = map(sin(time2 * 2. * PI) , -1.,1.,-1.,1.);
    float sc2 = map(sin(time * 2. * PI) , -2.,2.,0.2,-2.);
    float amp2 = map(sin(time * 2. * PI) , -2.,2.,10.,30.);
    float box = sdBox(pos.xy - smoothstep(1.9999, 1.9998, length(pos.xy -0.5) ) - mod(uTime*2. , offset.z *0.01) , vec2(0.5)) ;
    float boundBox = (4. * (box*0.5));
    float n3 = fbm(vec3((pos.xy) * vec2(floor(sc2), .5)- vec2(1., uTime*0.1), uTime*0.5)   ) * amp2 ;

  
    float n = fbm(vec3(pos.xy * vec2(2.,  floor(sc)) + vec2(1., uTime*0.25) , uTime*0.5)   ) * amp2 * 2.;
    // float n2 = snoise(vec3(pos.xy + vec2(1., uTime*0.5) , uTime*0.75)   )*.5;
    vel *= n  *0.5 *n3 * boundBox;
    pos.x += vel.x * cos(n * n3) * 0.075;
    pos.y += vel.y * sin(n * n3) * 0.075;


    //   pos.xyz = mod(pos.xyz, 2.);
      gl_FragColor = vec4(pos);


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
