'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D } from 'three'

interface AsteroidBeltProps {
  count?: number
  innerRadius?: number
  outerRadius?: number
}

export default function AsteroidBelt({
  count = 1200,
  innerRadius = 12.5, // Positions belt right between Mars (11) and Jupiter (15)
  outerRadius = 14.2,
}: AsteroidBeltProps) {
  const meshRef = useRef<InstancedMesh>(null!)

  // Generate random polar coordinates & transform data for 1,200 rocks
  const asteroidData = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
      
      // Calculate ring coordinates using trigonometry
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (Math.random() - 0.5) * 0.8 // Slight height variance above/below orbit plane

      const scale = Math.random() * 0.06 + 0.02
      data.push({ x, y, z, scale })
    }
    return data
  }, [count, innerRadius, outerRadius])

  // Populate instanced matrix transforms on initial component load
  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new Object3D()

    asteroidData.forEach((ast, i) => {
      dummy.position.set(ast.x, ast.y, ast.z)
      dummy.scale.set(ast.scale, ast.scale, ast.scale)
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [asteroidData])

  // Orbit the entire belt continuously around the Sun
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Low-poly icosahedron gives rocks an irregular, jagged asteroid appearance */}
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#6b7280" roughness={0.9} metalness={0.2} />
    </instancedMesh>
  )
}