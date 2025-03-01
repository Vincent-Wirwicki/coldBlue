export const fragRender = /* glsl */ `
    varying vec3 vPos;
    varying vec2 vUv;
    varying float vDiff;
    uniform sampler2D uPositions;
    varying vec3 vTone;

float viewZ2depth( const in float viewZ, const in float near, const in float far ) {

    return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
    
}


    void main(){
 
        float blend = min(1. - vTone.z, vDiff);
        
        
        gl_FragColor = vec4(vec3(0.15), 1.);


    }

`;
