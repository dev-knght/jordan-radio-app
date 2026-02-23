import { Play, Pause } from 'lucide-react'
import DefaultIcon from './DefaultIcon'

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
      {/* Card header: logo + frequency badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center justify-center h-16 w-16 flex-shrink-0">
          {station.logo ? (
            <img
              src={station.logo}
              alt={`${station.name} logo`}
              className="h-full w-full object-contain"
            />
          ) : (
            <DefaultIcon />
          )}
        </div>

        {/* Frequency badge */}
        {station.frequency && station.frequency !== 'Online' && (
          <div className="bg-dark-600/80 backdrop-blur text-[10px] px-2 py-0.5 rounded-full border border-dark-500">
            {station.frequency}
          </div>
        )}
        {station.frequency === 'Online' && (
          <div className="bg-accent-600/90 backdrop-blur text-[10px] px-2 py-0.5 rounded-full border border-accent-500/50">
            Online
          </div>
        )}
      </div>

      {/* Station name */}
      <h3 className="font-semibold text-lg text-center line-clamp-2 min-h-[3rem] mb-1">
        {station.name}
      </h3>

      {/* Genre */}
      {station.genre && (
        <p className="text-xs text-center text-gray-400 line-clamp-1">
          {station.genre}
        </p>
      )}

      {/* Playing indicator (small dot) */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1 mt-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
          </span>
          <span className="text-[10px] text-accent-500 font-medium">Playing</span>
        </div>
      )}

      {/* Play button (centered overlay on hover, or always visible when not playing) */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-200 rounded-2xl
          ${isPlaying ? 'opacity-0 pointer-events-none' : 'bg-black/20 opacity-0 group-hover:opacity-100'}
        `}
      >
        <button className="h-14 w-14 flex items-center justify-center bg-accent-500 hover:bg-accent-600 rounded-full text-white shadow-xl transform transition-transform active:scale-95">
          <Play size={28} className="ml-1" />
        </button>
      </div>

      {/* Border accent when playing */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-accent-500 pointer-events-none" />
      )}
    </div>
  )
}

export default StationCard
