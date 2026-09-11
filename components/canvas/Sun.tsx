'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'

export default function Sun() {
  const innerGlowRef = useRef<Mesh>(null!)
  const outerGlowRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    // Continuous rotation for atmosphere layers
    if (outerGlowRef.current) {
      outerGlowRef.current.rotation.y += delta * 0.02
      
      // Dynamic breathing scale effect on the outer glow
      const pulse = 2.1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
      outerGlowRef.current.scale.setScalar(pulse)
    }

    if (innerGlowRef.current) {
      innerGlowRef.current.rotation.y -= delta * 0.03
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Point Light - Warm white light shining across space */}
      <pointLight
        intensity={22}
        distance={250}
        decay={1.2}
        color={new Color('#fffdfa')}
      />

      {/* 2. True-to-Life White-Hot Core Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 3. Golden Surface Atmosphere Layer */}
      <mesh scale={1.03}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#ffd043" transparent opacity={0.7} />
      </mesh>

      {/* 4. Warm Radial Atmospheric Halo (Inner Glow) */}
      {/* <mesh ref={innerGlowRef} scale={1.35}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh> */}

      {/* 5. Volumetric Soft Corona (Outer Pulsing Glow) */}
      {/* <mesh ref={outerGlowRef} scale={2.1}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff5500"
          transparent
          opacity={0.15}
          side={2}
        />
      </mesh> */}
    </group>
  )
}