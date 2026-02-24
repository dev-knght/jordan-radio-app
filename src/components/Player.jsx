import { useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import DefaultIcon from './DefaultIcon'

function Player({
  station,
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  muted,
  onToggleMute,
  showVolume = true
}) {
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800/90 backdrop-blur-lg border-t border-dark-600 px-4 py-3 flex items-center gap-4 z-50 shadow-2xl">
      {/* Station logo */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-dark-600 rounded-full overflow-hidden ring-2 ring-accent-500/30">
        {station.logo && !logoError ? (
          <img
            src={station.logo}
            alt={station.name}
            className="h-10 w-10 object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <DefaultIcon />
        )}
      </div>

      {/* Now playing info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white truncate text-base">
          {station.name}
        </h4>
        <p className="text-xs text-gray-400 truncate">
          {station.genre || 'Jordan Radio'}
        </p>
        {/* Wavy animation when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 mt-1 h-3">
            <span className="w-1 bg-accent-500 rounded-full animate-wave" style={{ animationDelay: '0ms', height: '60%' }} />
            <span className="w-1 bg-accent-500 rounded-full animate-wave" style={{ animationDelay: '150ms', height: '80%' }} />
            <span className="w-1 bg-accent-500 rounded-full animate-wave" style={{ animationDelay: '300ms', height: '40%' }} />
            <span className="w-1 bg-accent-500 rounded-full animate-wave" style={{ animationDelay: '450ms', height: '70%' }} />
            <span className="w-1 bg-accent-500 rounded-full animate-wave" style={{ animationDelay: '600ms', height: '50%' }} />
          </div>
        )}
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-3">
        {/* Volume control */}
        {showVolume && (
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-500"
            />
          </div>
        )}

        {/* Play/Pause button */}
        <button
          onClick={onTogglePlay}
          className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-accent-500 hover:bg-accent-600 rounded-full text-white shadow-lg transition-transform active:scale-95"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
      </div>
    </div>
  )
}

export default Player
