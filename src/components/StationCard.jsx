import { Play, Pause } from 'lucide-react'

function StationCard({ station, isPlaying, onPlay }) {
  const handleClick = () => {
    if (isPlaying) {
      // The parent controls play/pause at player level; clicking again will be ignored
      return
    }
    onPlay(station)
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-dark-800 rounded-xl p-4 cursor-pointer
        border-2 transition-all duration-200
        ${isPlaying
          ? 'border-accent-500 shadow-lg shadow-accent-500/20 scale-[1.02]'
          : 'border-dark-600 hover:border-accent-500/50 hover:shadow-md'
        }
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 mb-3">
        {station.logo ? (
          <img
            src={station.logo}
            alt={`${station.name} logo`}
            className="max-h-16 max-w-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className={`h-16 w-16 flex items-center justify-center bg-dark-600 rounded-full ${station.logo ? 'hidden' : ''}`}
        >
          <span className="text-2xl">📻</span>
        </div>
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
        <div className="absolute top-2 right-2 bg-dark-600 text-xs px-2 py-1 rounded-full">
          {station.frequency}
        </div>
      )}

      {/* Online badge */}
      {station.frequency === 'Online' && (
        <div className="absolute top-2 right-2 bg-accent-600 text-xs px-2 py-1 rounded-full">
          Online
        </div>
      )}

      {/* Play indicator */}
      {isPlaying && (
        <div className="absolute top-2 left-2">
          <div className="flex items-center gap-1 bg-accent-600 text-white text-xs px-2 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
          </div>
        </div>
      )}

      {/* Play button overlay */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl
          transition-opacity duration-200
          ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black/30'}
        `}
      >
        <button className="h-12 w-12 flex items-center justify-center bg-accent-500 hover:bg-accent-600 rounded-full text-white shadow-lg">
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
      </div>
    </div>
  )
}

export default StationCard