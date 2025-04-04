import { useFBO } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect } from "react";
// import useInitRenderTarget from "./useInitRenderTarget";
import { Camera, FloatType, NearestFilter, RGBAFormat, Scene, ShaderMaterial } from "three";

const useInitAndAnimateFBO = (size: number, scene, camera, simMatRef, renderMatRef) => {
  let target = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    type: FloatType,
    // depth: true,
    // stencilBuffer: true,
  });
  let target1 = target.clone();

  const state = useThree();

  //init all the texture
  useEffect(() => {
    const { gl } = state;
    gl.setRenderTarget(target);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(target1);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  useFrame(state => {
    if (!simMatRef.current || !renderMatRef.current)
      return console.error("no sim or render mat");

    const { gl, clock, camera: c } = state;
    console.log(c.position);

    simMatRef.current.uniforms.uTime.value = clock.elapsedTime;
    simMatRef.current.uniforms.uPositions.value = target.texture;

    renderMatRef.current.uniforms.uPositions.value = target1.texture;

    gl.setRenderTarget(target1);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    //swap texture
    const temp = target;
    target = target1;
    target1 = temp;
  });
};

export default useInitAndAnimateFBO