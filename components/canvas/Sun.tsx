'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'

export default function Sun() {
  const innerGlowRef = useRef<Mesh>(null!)
  const outerGlowRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    // Gentle pulse effect for outer atmospheric glow
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* 1. High-Power Point Light - Radiates natural sunlight across space */}
      <pointLight
        intensity={20}
        distance={200}
        decay={1.2}
        color={new Color('#fff8e7')}
      />

      {/* 2. White-Hot Core Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 3. Golden Surface Flare Layer */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#ffcc33" transparent opacity={0.85} />
      </mesh>

      {/* 4. Warm Radial Atmospheric Halo (Inner Glow) */}
      {/* <mesh ref={innerGlowRef} scale={1.4}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.35}
          side={2}
        />
      </mesh> */}

      {/* 5. Volumetric Soft Corona (Outer Glow) */}
      {/* <mesh ref={outerGlowRef} scale={2.1}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.12}
          side={2}
        />
      </mesh> */}
    </group>
  )
}