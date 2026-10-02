import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold mb-4">About Page</h1>
      <p className="text-neutral-400 mb-8">Notice how the template overlay smoothly animated on route change!</p>
      <Link
        href="/animation"
        className="px-6 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-white transition-colors"
      >
        ← Back Home
      </Link>
    </main>
  );
}