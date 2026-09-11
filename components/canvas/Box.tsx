'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export default function Box() {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHover] = useState(false)

  // useFrame hooks directly into R3F's render loop (frame-by-frame execution)
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.8
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#6366f1' : '#4f46e5'} />
    </mesh>
  )
}