import { Canvas } from '@react-three/fiber'
import  { ReactNode } from 'react'
import { Vector3 } from 'three'

const MainCanvas = ({children}:{children:ReactNode}) => {
  return (
    <Canvas        camera={{
              position: [1, 1, 2.5],
              lookAt: () => new Vector3(0, 0, 0),
            }}
            dpr={2}>
        {children}
    </Canvas>
  )
}

export default MainCanvas