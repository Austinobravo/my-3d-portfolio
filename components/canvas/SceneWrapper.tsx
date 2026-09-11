'use client'

import dynamic from 'next/dynamic'

// Move ssr: false HERE inside a Client Component
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
  loading: () => <div className="p-8 text-white">Loading 3D Engine...</div>,
})

export default function SceneWrapper() {
  return <Scene />
}