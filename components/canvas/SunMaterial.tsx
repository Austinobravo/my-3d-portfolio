import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Custom GLSL Shader for procedural solar flares & pulsating surface texture
export const SunShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorCenter: new THREE.Color('#fff7ed'), // Bright yellow-white center
    uColorEdge: new THREE.Color('#ea580c'),   // Deep orange-red flare edge
  },
  // Vertex Shader: Calculates screen positions and normals
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader: Generates pulsating procedural solar flares using GLSL sine noise
  /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorCenter;
    uniform vec3 uColorEdge;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      // Create animated procedural noise patterns across surface UVs
      float noise = sin(vUv.x * 20.0 + uTime * 1.5) * cos(vUv.y * 20.0 + uTime * 1.5) * 0.5 + 0.5;
      
      // Calculate Fresnel edge intensity (rim lighting)
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);
      
      // Blend center color with edge flare color
      vec3 finalColor = mix(uColorCenter, uColorEdge, noise + fresnel * 0.5);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

// Register custom material so React Three Fiber recognizes <sunShaderMaterial />
extend({ SunShaderMaterial })

// TypeScript declaration for JSX tag recognition
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sunShaderMaterial: any
    }
  }
}