'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF, Center, Environment } from '@react-three/drei'

// Loads the .glb model from the public/models/ folder
function LowPolyIsland() {
  // useGLTF automatically fetches and parses the GLB asset
  const { scene } = useGLTF('/models/Duck.glb')

  return (
    <primitive
      object={scene}
      scale={1.2}
      position={[0, -1, 0]}
    />
  )
}

// Pre-loads the model file into browser cache to eliminate load lag
useGLTF.preload('/models/Duck.glb')

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md border border-slate-700 shadow-xl whitespace-nowrap">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
        Loading Low-Poly Island...
      </div>
    </Html>
  )
}

export default function IslandScene() {
  return (
    <div className="relative h-screen w-full bg-slate-950 overflow-hidden">
      <Canvas
        camera={{ position: [0, 6, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} castShadow />

        {/* Photorealistic Environment Lighting */}
        <Environment preset="city" />

        <Suspense fallback={<LoadingSpinner />}>
          <Center>
            <LowPolyIsland />
          </Center>
        </Suspense>

        <OrbitControls
          enableDamping
          maxPolarAngle={Math.PI / 2.05} // Stops camera from going under the island ground
          minDistance={3}
          maxDistance={25}
        />
      </Canvas>
    </div>
  )
}