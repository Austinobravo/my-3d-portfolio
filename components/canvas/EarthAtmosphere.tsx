'use client'

import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

export const AtmosphereMaterial = shaderMaterial(
  {
    color: new THREE.Color('#38bdf8'), // Cyan-blue atmosphere
  },
  /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      // Fresnel effect for edge glow intensity
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      gl_FragColor = vec4(color, 1.0) * intensity;
    }
  `
)

extend({ AtmosphereMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      atmosphereMaterial: any
    }
  }
}

export default function EarthAtmosphere({ radius }: { radius: number }) {
  return (
    <mesh scale={1.04}>
      <sphereGeometry args={[radius, 32, 32]} />
      <atmosphereMaterial transparent side={THREE.BackSide} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}