'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { extend, ThreeElement } from '@react-three/fiber'
import * as THREE from 'three'

// Custom Water Shader with wave displacement and color gradients
export const OceanWaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uDeepColor: new THREE.Color('#0284c7'),  // Deep ocean blue
    uShallowColor: new THREE.Color('#38bdf8'), // Shallow turquoise beach water
  },
  // Vertex Shader: Creates wave ripples on plane vertices
  /* glsl */ `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      // Create sine/cosine wave undulations across X and Z
      float elevation = sin(modelPosition.x * 1.5 + uTime * 1.2) * 
                        cos(modelPosition.z * 1.5 + uTime * 1.2) * 0.15;

      modelPosition.y += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  // Fragment Shader: Blends colors based on wave height
  /* glsl */ `
    uniform vec3 uDeepColor;
    uniform vec3 uShallowColor;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Mix shallow beach color with deep ocean color depending on wave elevation
      float mixStrength = (vElevation + 0.15) * 2.5;
      vec3 color = mix(uDeepColor, uShallowColor, mixStrength);

      gl_FragColor = vec4(color, 0.85); // 0.85 transparency for beach water feel
    }
  `
)

extend({ OceanWaterMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    oceanWaterMaterial: ThreeElement<typeof OceanWaterMaterial>
  }
}

export default function Water() {
  const materialRef = useRef<any>(null!)

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta
    }
  })

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.8, 0]}>
      {/* Large plane with high vertex segments (64x64) so waves smooth out */}
      <planeGeometry args={[120, 120, 64, 64]} />
      <oceanWaterMaterial ref={materialRef} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}