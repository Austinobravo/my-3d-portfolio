'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Html } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { Mesh } from 'three'

function ProjectPortal({
  title,
  route,
  position,
  color,
}: {
  title: string
  route: string
  position: [number, number, number]
  color: string
}) {
  const router = useRouter()
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.8
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => router.push(route)}
          scale={hovered ? 1.25 : 1.0}
        >
          <icosahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            wireframe={hovered}
          />
        </mesh>

        {/* Floating HTML Label above 3D Portal */}
        <Html position={[0, 2.3, 0]} center>
          <div
            className={`pointer-events-none rounded-xl px-4 py-2 text-sm font-extrabold text-white backdrop-blur-md border transition-all ${
              hovered
                ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-indigo-500/50 shadow-xl'
                : 'bg-black/70 border-white/20'
            }`}
          >
            {title}
          </div>
        </Html>
      </group>
    </Float>
  )
}

export default function HomeScene() {
  return (
    <div className="relative h-screen w-full bg-slate-950 overflow-hidden">
      {/* HTML Overlay Title Header */}
      <div className="absolute top-12 left-1/2 z-20 -translate-x-1/2 text-center pointer-events-none">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          3D WebGL Portfolio Hub
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-400 sm:text-base">
          Click an interactive 3D orb to launch a project experience
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={3000} factor={4} fade />

        {/* Project 1 Portal Orb */}
        <ProjectPortal
          title="Project 1: Solar System"
          route="/solar"
          position={[-3, 0, 0]}
          color="#38bdf8"
        />

        {/* Project 2 Portal Orb */}
        <ProjectPortal
          title="Project 2: Low-Poly Island"
          route="/island"
          position={[3, 0, 0]}
          color="#10b981"
        />
        <ProjectPortal
          title="Project 3: Animations"
          route="/animation"
          position={[1, 0, 0]}
          color="#b95f10"
        />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}