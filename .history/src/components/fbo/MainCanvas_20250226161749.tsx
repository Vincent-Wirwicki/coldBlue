import { Canvas } from '@react-three/fiber'
import React, { ReactNode } from 'react'

const MainCanvas = ({children}:{children:ReactNode}) => {
  return (
    <Canvas></Canvas>
  )
}

export default MainCanvas