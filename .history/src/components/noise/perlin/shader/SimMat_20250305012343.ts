import { DataTexture, ShaderMaterial } from "three";

export default class SimMatPerlin extends ShaderMaterial {
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

    //	Classic Perlin 3D Noise 
    //	by Stefan Gustavson (https://github.com/stegu/webgl-noise)
    //
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for(int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

    float map(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }
float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdEquilateralTriangle( in vec2 p, in float r )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float tetrahedronSDF(vec3 p, float h)  {
    vec3 q = abs(p);
    
    float y = p.y;
    float d1 = q.z-max(0.,y);
    float d2 = max(q.x*.5 + y*.5,.0) - min(h, h+y);
    return length(max(vec2(d1,d2),.005)) + min(max(d1,d2), 0.0);
}

    void main(){
      vec2 uv = vUv;
      float time = mod(mod(uTime *0.15, 1.0) + 1.0, 1.0);
      float time2 = mod(mod(uTime*0.25, 1.0) + 1.0, 1.0);

      float repeat = sin(time * 2. * PI);
      vec4 pos = texture2D( uPositions, uv);
      vec4 offset = texture2D( uOffset, uv);
      vec4 ip = pos;

      float angle = atan(pos.x, pos.y);
      float radius = length(pos.xy);
      vec2 dir = normalize(pos.xy);
      vec2 vel = offset.xy;
  


    float sc = map(sin(time2 * 2. * PI) , -2.,2.,2.,1.);
    float sc2 = map(sin(time * 2. * PI)*0.25 , -2.,2.,-2.,2.);
    float amp2 = map(sin(time * 2. * PI) , -2.,2.,20.,30.);
    vec2 sdPos = pos.xy - smoothstep(1.9999, 1.9998, length(pos.xy -0.5) ) - mod(uTime*2. , .001); 
    float mlb = map(time *4., 0.,1.,0.15,0.75);
    float mlb2 = map(time *2., 0.,1.,0.75,0.15);
    float box = sdBox(sdPos , vec2(time2 * 0.15 +0.2, 0.1)) ;
    float box2 = sdBox(sdPos , vec2(time*0.015 , time*0.25 + 0.5)) ;
    float triangle = sdEquilateralTriangle(sdPos, 0.5);
    float circle = sdCircle(sdPos, time + 0.71);
    float mixGeo = mix(length(box), length(circle), repeat);

    float n3;
    for(int i = 0; i<4; i++){
      
      n3 += cnoise(vec3(pos.xy * vec2(0.,.5)  , uTime*0.75) + vec3(0.,uTime*0.1,0.)) * 15. * amp2;
    }

    float n = cnoise(vec3(pos.xy * vec2(.5,.75)  , uTime*0.5)) * 10.;
    vel *= (n3  *0.075 * n )  * box ;


    pos.x += vel.x * cos(n * n3) * 0.1 ;
    pos.y += vel.y * sin(n * n3) * 0.1 ;


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
