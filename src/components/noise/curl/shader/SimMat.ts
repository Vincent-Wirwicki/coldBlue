import { DataTexture, ShaderMaterial, Vector2 } from "three";

export default class SimMatCurly extends ShaderMaterial {
  constructor(pos: DataTexture, offset: DataTexture) {
    super({
      uniforms: {
        uPositions: { value: pos },
        uOffset: { value: offset },
        uTime: { value: 0 },
        uRes: { value: new Vector2(0.5, 0.5) },
        uMouse: { value: new Vector2(0.5, 0.5) },
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
       uniform vec2 uMouse;

       uniform float uTime;
       varying vec2 vUv;  
       #define PI 3.141592653

    // --------------------------------------------------------------
    // CURL NOISE START----------------------------------------------
    // --------------------------------------------------------------

    // Description : Array and textureless GLSL 2D/3D/4D simplex
    //               noise functions.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //
    //	Simplex 3D Noise 
    //	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
    //

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

    vec3 snoise3( vec3 x ){
        float s  = snoise(vec3( x ));
        float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
        float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
        return vec3( s , s1 , s2 );
    }

    vec3 curl( vec3 p ){
        const float e = .1;
        vec3 dx = vec3( e   , 0.0 , 0.0 );
        vec3 dy = vec3( 0.0 , e   , 0.0 );
        vec3 dz = vec3( 0.0 , 0.0 , e   );
    
        vec3 p_x0 = snoise3( p - dx );
        vec3 p_x1 = snoise3( p + dx );
        vec3 p_y0 = snoise3( p - dy );
        vec3 p_y1 = snoise3( p + dy );
        vec3 p_z0 = snoise3( p - dz );
        vec3 p_z1 = snoise3( p + dz );
    
        float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
        float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
        float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
    
        const float divisor = 1.0 / ( 2.0 * e );
        #ifndef CURL_UNNORMALIZED
        return normalize( vec3( x , y , z ) * divisor );
        #else
        return vec3( x , y , z ) * divisor;
        #endif
    }
    // --------------------------------------------------------------
    // CURL NOISE END----------------------------------------------
    // --------------------------------------------------------------
    float map(in float v, in float iMin, in float iMax, in float oMin, in float oMax) { return oMin + (oMax - oMin) * (v - iMin) / (iMax - iMin); }
    float sdBox( in vec2 p, in vec2 b ){
        vec2 d = abs(p)-b;
        return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
    }

    void main(){
      vec2 uv = vUv;
      vec4 pos = texture2D( uPositions, uv );
      vec4 offset = texture2D( uOffset, uv );

      float box = sdBox(pos.xy - smoothstep(1.9999, 1.9998, length(pos.xy -0.5) ) - mod(uTime , .01) , vec2(0.5)) ;
      vec2 vel = offset.xy;
      vec3 nc = curl(vec3(pos.x*1.25,pos.y*.85 , uTime *0.15 - length(box)) + vec3(0.,0.*0.25,0.))*8.   ;
      float d2 = length(nc.xy  + pos.xy) *0.15;
      vel *= nc.xy *0.15 * length(box) ;
      pos.x -= vel.x * normalize(nc.x) * smoothstep(0.,0.5,d2)    ;
      pos.y -= vel.y * normalize(nc.y) * smoothstep(0.,0.5,d2)  ;

      float mouseRadius = 0.1; // adjust as needed (0.0 - 1.0)
      float distToMouse = length(pos.xy - uMouse.xy);


      float dist = distance(pos.xy, uMouse.xy);
      if(distToMouse < mouseRadius) {
        vec2 toMouse = uMouse.xy - pos.xy;
        vec2 dir = normalize(toMouse);
        vec2 vortex = normalize(vec2(-toMouse.y, toMouse.x)); // Perpendicular
        float strength = smoothstep(mouseRadius, 0.0, distToMouse);
        pos.xy += (dir * 0.002 + vortex * 0.08) * strength * d2 ;
      }
      
      pos = mod(pos, 4.);

      gl_FragColor = vec4(pos);
    }
`,
    });
  }
}
