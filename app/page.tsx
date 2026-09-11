import SceneWrapper from '@/components/canvas/SceneWrapper'

export default function Home() {
  return (
    <main className="relative flex min-h-screen ">
      {/* 3D Background via Wrapper */}
      <SceneWrapper />

      {/* HTML Overlay Content */}
      {/* <div className="pointer-events-none z-10 text-center">
        <h1 className="text-6xl font-bold tracking-tight ">
          3D Interactive World
        </h1>
        <p className="mt-4 text-xl ">
          Built with Next.js, React Three Fiber & Tailwind
        </p>
      </div> */}
    </main>
  )
}