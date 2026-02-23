import { Play, Pause } from 'lucide-react'

// Default radio tower icon (SVG data URI)
const DEFAULT_LOGO = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <circle cx="32" cy="32" r="30" fill="#1a1a1a" stroke="#333" stroke-width="2"/>
  <path d="M32 16v20l12 8" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="16" r="3" fill="#10b981"/>
  <circle cx="44" cy="24" r="2" fill="#10b981"/>
  <circle cx="44" cy="32" r="2" fill="#10b981"/>
</svg>
`)

function StationCard({ station, isPlaying, onPlay }) {
  const handleClick = () => {
    if (isPlaying) return
    onPlay(station)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative group rounded-2xl p-4 cursor-pointer transition-all duration-300
        bg-dark-800/60 backdrop-blur-sm border border-dark-600
        ${isPlaying
          ? 'ring-2 ring-accent-500 shadow-xl shadow-accent-500/20 scale-[1.02] bg-dark-700/80'
          : 'hover:border-accent-500/60 hover:shadow-lg hover:scale-[1.01]'
        }
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 mb-3 relative">
        <div className={`absolute inset-0 bg-gradient-to-br from-accent-500/10 to-transparent rounded-xl ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
        {station.logo ? (
          <img
            src={station.logo}
            alt={`${station.name} logo`}
            className="max-h-16 max-w-full object-contain relative z-10"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = DEFAULT_LOGO
            }}
          />
        ) : (
          <img
            src={DEFAULT_LOGO}
            alt="default station icon"
            className="h-16 w-16 object-contain relative z-10"
          />
        )}
      </div>

      {/* Station name */}
      <h3 className="font-semibold text-lg text-center line-clamp-2 min-h-[3rem]">
        {station.name}
      </h3>

      {/* Genre */}
      {station.genre && (
        <p className="text-xs text-center text-gray-400 mt-1 line-clamp-1">
          {station.genre}
        </p>
      )}

      {/* Frequency badge */}
      {station.frequency && station.frequency !== 'Online' && (
        <div className="absolute top-2 right-2 bg-dark-600/80 backdrop-blur text-xs px-2 py-1 rounded-full border border-dark-500">
          {station.frequency}
        </div>
      )}

      {/* Online badge */}
      {station.frequency === 'Online' && (
        <div className="absolute top-2 right-2 bg-accent-600/90 backdrop-blur text-xs px-2 py-1 rounded-full border border-accent-500/50">
          Online
        </div>
      )}

      {/* Playing indicator */}
      {isPlaying && (
        <div className="absolute top-2 left-2">
          <div className="flex items-center gap-1 bg-accent-600 text-white text-[10px] px-2 py-1 rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        </div>
      )}

      {/* Play overlay */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl
          transition-opacity duration-200
          ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:bg-black/20'}
        `}
      >
        <button className="h-14 w-14 flex items-center justify-center bg-accent-500 hover:bg-accent-600 rounded-full text-white shadow-xl transform transition-transform active:scale-95">
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
        </button>
      </div>
    </div>
  )
}

export default StationCard
