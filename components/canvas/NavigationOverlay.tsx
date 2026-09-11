'use client'

interface NavigationOverlayProps {
  planets: string[]
  selectedPlanet: string | null
  onSelectPlanet: (planetName: string) => void
  onReset: () => void
}

export default function NavigationOverlay({
  planets,
  selectedPlanet,
  onSelectPlanet,
  onReset,
}: NavigationOverlayProps) {
  return (
    <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none sm:top-4 sm:right-4 sm:left-auto sm:max-w-xl sm:flex-wrap sm:justify-end sm:pb-0">
      <button
        onClick={onReset}
        className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-md transition-all hover:bg-indigo-500 active:scale-95 border border-indigo-400/30"
      >
        Overview
      </button>

      {planets.map((name) => {
        const isSelected = selectedPlanet === name
        return (
          <button
            key={name}
            onClick={() => onSelectPlanet(name)}
            className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 border ${
              isSelected
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg scale-105'
                : 'bg-slate-900/80 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}