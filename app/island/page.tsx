'use client'

import Link from 'next/link'
import IslandScene from '@/components/canvas/IslandScene'

export default function IslandPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Link
        href="/"
        className="absolute top-4 left-4 z-40 rounded-lg bg-slate-900/80 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md border border-slate-700/60 transition-all hover:bg-slate-800"
      >
        ← Back to Hub
      </Link>

      <IslandScene />
    </main>
  )
}