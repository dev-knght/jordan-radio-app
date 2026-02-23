import { Play, Pause, Music } from 'lucide-react'

function Player({ station, isPlaying, onTogglePlay }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-600 px-4 py-3 flex items-center gap-4 z-50">
      {/* Station logo */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-dark-600 rounded-full overflow-hidden">
        {station.logo ? (
          <img
            src={station.logo}
            alt={station.name}
            className="h-10 w-10 object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className={`h-10 w-10 flex items-center justify-center ${station.logo ? 'hidden' : ''}`}>
          <Music size={20} />
        </div>
      </div>

      {/* Now playing info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate">{station.name}</h4>
        <p className="text-xs text-gray-400 truncate">
          {station.genre || 'Jordan Radio'}
        </p>
      </div>

      {/* Play/Pause button */}
      <button
        onClick={onTogglePlay}
        className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-accent-500 hover:bg-accent-600 rounded-full text-white shadow-lg transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>
    </div>
  )
}

export default Player