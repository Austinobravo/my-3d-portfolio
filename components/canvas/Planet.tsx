'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Group, Mesh, TextureLoader, CanvasTexture } from 'three'
import EarthAtmosphere from './EarthAtmosphere'

interface PlanetProps {
  name: string
  textureUrl?: string
  baseColor: string
  secondaryColor: string
  size: number
  distanceFromSun: number
  orbitSpeed: number
  rotationSpeed: number
  isPaused: boolean
  isSelected: boolean
  hasRings?: boolean
  ringColor?: string
  onSelect: (name: string, targetMesh: Mesh) => void
  onRegister?: (name: string, targetMesh: Mesh) => void // Registers mesh immediately on mount
}

function createFallbackTexture(primaryColor: string, secondaryColor: string): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.fillStyle = primaryColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 40; i++) {
      const y = Math.random() * canvas.height
      const height = Math.random() * 40 + 5
      ctx.fillStyle = secondaryColor
      ctx.globalAlpha = Math.random() * 0.3 + 0.05
      ctx.fillRect(0, y, canvas.width, height)
    }

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
    grad.addColorStop(0, 'rgba(255,255,255,0.25)')
    grad.addColorStop(0.2, 'rgba(0,0,0,0)')
    grad.addColorStop(0.8, 'rgba(0,0,0,0)')
    grad.addColorStop(1, 'rgba(255,255,255,0.25)')
    ctx.globalAlpha = 1.0
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return new CanvasTexture(canvas)
}

export default function Planet({
  name,
  baseColor,
  secondaryColor,
  textureUrl,
  size,
  distanceFromSun,
  orbitSpeed,
  rotationSpeed,
  isPaused,
  isSelected,
  hasRings = false,
  ringColor = '#c2b280',
  onSelect,
  onRegister,
}: PlanetProps) {
  const orbitRef = useRef<Group>(null!)
  const planetRef = useRef<Mesh>(null!)

  // Register mesh immediately after first frame render
  useEffect(() => {
    if (planetRef.current && onRegister) {
      onRegister(name, planetRef.current)
    }
  }, [name, onRegister])

  const textureMap = useMemo(() => {
    if (!textureUrl) return createFallbackTexture(baseColor, secondaryColor)

    const loader = new TextureLoader()
    const fallback = createFallbackTexture(baseColor, secondaryColor)

    return loader.load(
      textureUrl,
      (loaded) => loaded,
      undefined,
      () => fallback
    )
  }, [textureUrl, baseColor, secondaryColor])

  useFrame((_, delta) => {
    if (!isPaused) {
      orbitRef.current.rotation.y += delta * orbitSpeed
    }
    planetRef.current.rotation.y += delta * rotationSpeed
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    onSelect(name, planetRef.current)
  }

  const roughnessValue = distanceFromSun < 8 ? 0.4 : 0.8
  const metalnessValue = distanceFromSun < 8 ? 0.1 : 0.0

  return (
    <group ref={orbitRef}>
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[distanceFromSun - 0.03, distanceFromSun + 0.03, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={isSelected ? 0.4 : 0.08} transparent />
      </mesh>

      <mesh ref={planetRef} position={[distanceFromSun, 0, 0]} onClick={handleClick}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={textureMap} roughness={roughnessValue} metalness={metalnessValue} />
        {/* {name === 'Earth' && <EarthAtmosphere radius={size} />} */}

        <Html distanceFactor={28} position={[0, size + 0.5, 0]} center>
          <div
            className={`pointer-events-none rounded px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-md transition-all ${
              isSelected ? 'bg-indigo-600 border border-indigo-400 scale-110' : 'bg-black/70 border border-white/20'
            }`}
          >
            {name}
          </div>
        </Html>

        {hasRings && (
          <mesh rotation-x={Math.PI / 2.5}>
            <ringGeometry args={[size * 1.3, size * 2.2, 64]} />
            <meshStandardMaterial color={ringColor} side={2} transparent opacity={0.65} roughness={0.9} />
          </mesh>
        )}
      </mesh>
    </group>
  )
}