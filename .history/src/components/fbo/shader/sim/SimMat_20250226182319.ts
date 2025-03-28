import { DataTexture, FloatType, RGBAFormat, ShaderMaterial } from "three";

// import { getSphere } from "../../../0-dataFn/getSphere";

export default class SimMatThomas extends ShaderMaterial {
  constructor(size: number, pos:DataTexture, offset: DataTexture) {


    super({
      uniforms: {
        uPositions: { value: pos },
        uPositions2: { value: offset },
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
    uniform sampler2D uPositions2;
    uniform float uTime;
    varying vec2 vUv;
    #define PI 3.141592653589793

    vec3 aizawaAttractor(vec3 pos, float dt){
        const float a = .95;	
        const float b = .7;
        const float c = .6;
        const float d = 3.5;
        const float e = .25;
        const float f = .1;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = (z - b)*x - d*y;
        target.y = d*x + (z - b)*y;
        target.z = c + a*z - (z*z*z / 3.) - (x*x + y*y) * (1. + e*z) + f*z*x*x*x;

        return target *dt ;
        
    }

    vec3 aizawaDAttractor(vec3 pos, float dt){
        const float a = .95;	
        const float b = .7;
        const float c = .6;
        const float d = 3.5;
        const float e = .25;
        const float f = .1;

        vec3 target = vec3(0);
        float x = pos.x;
        float y = pos.y;
        float z = pos.z;

        target.x = (pos.z - b);
    target.y = -d; 
    target.z = a - pos.z * pos.z - 2.0 * (pos.x * pos.x + pos.y * pos.y) * (1.0 + e * pos.z) + 3.0 * pos.z * pos.z - f * pos.x * pos.x * pos.x; // Derivative of c + a*z - (z*z*z)/3. - (x*x + y*y) * (1. + e*z) + f*z*x*x*x with respect to z

        return target  ;
        
    }
  // ---------------------------------------------------------------------------------------------
      //	Simplex 3D Noise 
      //	by Ian McEwan, Ashima Arts

      vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
      vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

      vec4 permute(const in vec4 v) { return mod289(((v * 34.0) + 1.0) * v); }

      float snoise(vec3 v)
        {
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
          
        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
          
      // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
          
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
          
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
          
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
          
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
          
        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
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

  
float quadraticOut(in float t) { return -t * (t - 2.0); }

    float map(float v, float iMin, float iMax ) { return (v-iMin)/(iMax-iMin); }
    float map1(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }

vec3 map3(in vec3 v, in vec3 iMin, in vec3 iMax, in vec3 oMin, in vec3 oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}
    void main() {
      vec2 uv = vUv;   
      vec3 pos = texture2D( uPositions, uv ).xyz;
      vec3 pos2 = texture2D( uPositions2, uv ).xyz;
      float time = mod(mod(uTime *0.15, 1.0) + 1.0, 1.0);
      float repeat = sin(time *2. * PI);
      float prog = map1(repeat, -1.,1.,0.0085,0.0065);
      vec3 q = pos;
      vec3 q2 = pos2;
      
      float freq = mix(4.,6.,prog);
      float amp = mix(0.15,0.25,prog);
     
      vec3 target = aizawaAttractor(pos, quadraticOut(prog )) ;
      // target = rotate(target,vec3(0.,0.5,0.75), 0.75);
      vec3 der = aizawaDAttractor(pos2, .001);
      float dist = length(target -  der ) *0.25;

      dist += snoise(pos * freq) * amp;
      pos += target * dist ;
      
      gl_FragColor = vec4(pos, 1.);
      }`,
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
