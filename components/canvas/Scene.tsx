'use client'

import { useRef, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Mesh, Vector3 } from 'three'
import Sun from './Sun'
import Planet from './Planet'
import AsteroidBelt from './AsteroidBelt'
import NavigationOverlay from './NavigationOverlay'
import { PLANETS_DATA } from '@/data/planetsData'

const PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

function CameraTracker({ targetMesh, controlsRef }: { targetMesh: Mesh | null; controlsRef: any }) {
  useFrame(() => {
    if (targetMesh && controlsRef.current) {
      const worldPos = new Vector3()
      targetMesh.getWorldPosition(worldPos)
      controlsRef.current.setTarget(worldPos.x, worldPos.y, worldPos.z, true)
    }
  })
  return null
}

export default function Scene() {
  const cameraControlsRef = useRef<any>(null!)
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [targetMesh, setTargetMesh] = useState<Mesh | null>(null)
  const [speedMultiplier, setSpeedMultiplier] = useState(0.2)
  const [isPaused, setIsPaused] = useState(false)

  const planetRefs = useRef<Record<string, Mesh>>({})

  // Callback to populate the reference map automatically as planets load
  const handleRegisterPlanet = useCallback((name: string, mesh: Mesh) => {
    planetRefs.current[name] = mesh
  }, [])

  const handleSelectPlanet = (name: string, mesh: Mesh) => {
    setSelectedPlanet(name)
    setTargetMesh(mesh)
    setIsPaused(true)

    const worldPos = new Vector3()
    mesh.getWorldPosition(worldPos)

    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        worldPos.x + 3,
        worldPos.y + 1,
        worldPos.z + 4,
        worldPos.x,
        worldPos.y,
        worldPos.z,
        true
      )
    }
  }

  const handleReset = () => {
    setSelectedPlanet(null)
    setTargetMesh(null)
    setIsPaused(false)
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(0, 20, 35, 0, 0, 0, true)
    }
  }

  const handleSelectByName = (name: string) => {
    const mesh = planetRefs.current[name]
    if (mesh) {
      handleSelectPlanet(name, mesh)
    }
  }

  return (
    <div className="relative h-screen w-full bg-slate-950 overflow-hidden">
      {/* Responsive Navigation Bar */}
      <NavigationOverlay
        planets={PLANET_NAMES}
        selectedPlanet={selectedPlanet}
        onSelectPlanet={handleSelectByName}
        onReset={handleReset}
      />

      {/* Control Header */}
      <div className="absolute top-16 left-4 z-20 flex flex-col gap-3 sm:top-6 sm:left-6">
        <button
          onClick={handleReset}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-indigo-500"
        >
          Reset View
        </button>

        <div className="flex items-center gap-2 rounded-lg bg-black/60 p-2 backdrop-blur-md border border-white/10 text-white text-xs">
          <span>Speed:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isPaused ? 0 : speedMultiplier}
            onChange={(e) => {
              setIsPaused(false)
              setSpeedMultiplier(parseFloat(e.target.value))
            }}
            className="w-24 accent-indigo-500"
          />
        </div>
      </div>

      {/* Planet Details Popup */}
      {selectedPlanet && PLANETS_DATA[selectedPlanet] && (
        <div className="absolute bottom-6 right-4 left-4 sm:left-auto z-30 sm:w-80 rounded-2xl bg-slate-900/90 p-5 text-white backdrop-blur-md border border-slate-700 shadow-2xl transition-all">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-indigo-400">{selectedPlanet}</h2>
            <span className="rounded-full bg-indigo-950 px-2.5 py-0.5 text-xs text-indigo-300 border border-indigo-800">
              {PLANETS_DATA[selectedPlanet].type}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            {PLANETS_DATA[selectedPlanet].fact}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
            <div>
              <span className="block font-semibold text-slate-200">Diameter</span>
              {PLANETS_DATA[selectedPlanet].diameter}
            </div>
            <div>
              <span className="block font-semibold text-slate-200">Orbit Period</span>
              {PLANETS_DATA[selectedPlanet].orbitPeriod}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 w-full rounded-lg bg-slate-800 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            Resume Exploration
          </button>
        </div>
      )}

      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 20, 35], fov: 50, far: 1000 }} dpr={[1, 2]}>
        <ambientLight intensity={0.25} />
        <Stars radius={300} depth={100} count={5000} factor={6} fade speed={1} />

        <Suspense fallback={null}>
          <Sun />
          <AsteroidBelt count={10200} innerRadius={50.5} outerRadius={8.5} />

          <Planet name="Mercury" baseColor="#8c8c8c" secondaryColor="#404040" size={0.3} distanceFromSun={4} orbitSpeed={0.9 * speedMultiplier} rotationSpeed={1.0} isPaused={isPaused} isSelected={selectedPlanet === 'Mercury'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Venus" baseColor="#e6c280" secondaryColor="#a67c3b" size={0.5} distanceFromSun={6} orbitSpeed={0.7 * speedMultiplier} rotationSpeed={0.8} isPaused={isPaused} isSelected={selectedPlanet === 'Venus'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Earth" textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg" baseColor="#2b82c5" secondaryColor="#1b4d2e" size={0.6} distanceFromSun={8.5} orbitSpeed={0.5 * speedMultiplier} rotationSpeed={1.5} isPaused={isPaused} isSelected={selectedPlanet === 'Earth'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Mars" baseColor="#c1440e" secondaryColor="#451804" size={0.4} distanceFromSun={11} orbitSpeed={0.4 * speedMultiplier} rotationSpeed={1.2} isPaused={isPaused} isSelected={selectedPlanet === 'Mars'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Jupiter" baseColor="#b07f35" secondaryColor="#52320a" size={1.2} distanceFromSun={15} orbitSpeed={0.25 * speedMultiplier} rotationSpeed={2.0} isPaused={isPaused} isSelected={selectedPlanet === 'Jupiter'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Saturn" baseColor="#e2bf7d" secondaryColor="#8a6d3b" size={1.0} distanceFromSun={19} orbitSpeed={0.18 * speedMultiplier} rotationSpeed={1.8} isPaused={isPaused} isSelected={selectedPlanet === 'Saturn'} hasRings ringColor="#eab308" onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Uranus" baseColor="#4b70dd" secondaryColor="#273d80" size={0.8} distanceFromSun={23} orbitSpeed={0.12 * speedMultiplier} rotationSpeed={1.4} isPaused={isPaused} isSelected={selectedPlanet === 'Uranus'} hasRings ringColor="#67e8f9" onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
          <Planet name="Neptune" baseColor="#274687" secondaryColor="#122247" size={0.75} distanceFromSun={27} orbitSpeed={0.08 * speedMultiplier} rotationSpeed={1.3} isPaused={isPaused} isSelected={selectedPlanet === 'Neptune'} onSelect={handleSelectPlanet} onRegister={handleRegisterPlanet} />
        </Suspense>

        <CameraTracker targetMesh={targetMesh} controlsRef={cameraControlsRef} />
        <CameraControls ref={cameraControlsRef} maxDistance={200} minDistance={2} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={2.8} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}