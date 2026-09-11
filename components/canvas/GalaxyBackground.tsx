'use client'

import { useMemo } from 'react'
import { CanvasTexture, Side } from 'three'

// Procedurally generates a Milky Way / Cosmic Dust Texture
function generateGalaxyTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Deep Space Background Base
    ctx.fillStyle = '#020208'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Cosmic Dust Nebulae (Blue & Purple Swirls)
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 400 + 200

      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
      const colorType = i % 2 === 0 ? '79, 70, 229' : '124, 58, 237' // Indigo / Violet
      grad.addColorStop(0, `rgba(${colorType}, ${Math.random() * 0.15 + 0.05})`)
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return new CanvasTexture(canvas)
}

export default function GalaxyBackground() {
  const texture = useMemo(() => generateGalaxyTexture(), [])

  return (
    <mesh scale={[-1, 1, 1]}>
      {/* Inverted sphere geometry acts as a skybox surrounding the scene */}
      <sphereGeometry args={[400, 64, 64]} />
      <meshBasicMaterial map={texture} side={2 as Side} />
    </mesh>
  )
}