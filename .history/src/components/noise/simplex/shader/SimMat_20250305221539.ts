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


/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

    float map(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }
float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
float sdCircle( vec2 p, float r )
{
    return length(p) - r;
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

    float box = sdBox(pos.xy - smoothstep(1.9999, 1.9998, length(pos.xy -0.5) ) - mod(uTime*2. , offset.z *0.01) , vec2(time, .5)) ;
    float circle = sdCircle(pos.xy - smoothstep(1.9999, 1.9998, length(pos.xy -0.5) ) - mod(uTime*2. , offset.z *0.01),  time2 * .25 + 0.5);
    float boundBox = (4. * (box*0.5));
    float n3;
    for(int i = 0; i<4; i++){
      n3 += snoise(vec3((pos.xy) * vec2(time2, .5)- vec2(1., uTime*0.1), uTime*0.5)   ) * amp2 ;
    }
  
    float n = snoise(vec3(pos.xy * vec2(2.,  floor(sc)) + vec2(1., uTime*0.25) , uTime*0.5)   ) * amp2 * 2.;
    float n2 = snoise(vec3(pos.xy + vec2(1., uTime*0.5) , uTime*0.75)   )*.5;
    vel *= n  *0.5 *n3 * mix(box, circle, time2 * 2.) ;
    pos.x += vel.x * cos(n * n3) * 0.075;
    pos.y += vel.y * sin(n * n3) * 0.075;


      pos.xyz = mod(pos.xyz, 2.);
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
