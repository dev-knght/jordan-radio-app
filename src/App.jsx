import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import StationList from './components/StationList'
import Player from './components/Player'
import GenreFilter from './components/GenreFilter'
import stationsData from './data/stations.json'

function App() {
  const [stations] = useState(stationsData)
  const [selectedWord, setSelectedWord] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  const filteredStations = useMemo(() => {
    let result = stations

    // Filter by genre word
    if (selectedWord) {
      const lower = selectedWord.toLowerCase()
      result = result.filter((s) => s.genre && s.genre.toLowerCase().includes(lower))
    }

    // Filter by search query (name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((s) => s.name.toLowerCase().includes(q))
    }

    return result
  }, [stations, selectedWord, searchQuery])

  const playStation = useCallback((station) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.remove()
    }
    const newAudio = new Audio(station.liveUrl)
    newAudio.volume = muted ? 0 : volume
    newAudio.play().catch((err) => {
      console.error('Playback failed:', err)
      setIsPlaying(false)
    })
    audioRef.current = newAudio
    setCurrentStation(station)
    setIsPlaying(true)
  }, [volume, muted])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => console.error('Playback failed:', err))
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume > 0 && muted) setMuted(false)
  }, [muted])

  const toggleMute = useCallback(() => {
    setMuted((m) => !m)
  }, [])

  // Apply mute to audio element when muted changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume
    }
  }, [muted, volume])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800 text-white flex flex-col">
      {/* Header */}
      <header className="bg-dark-800/80 backdrop-blur-md border-b border-dark-600 px-4 py-4 sticky top-0 z-40">
        <div className="container mx-auto flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <span>🇯🇴</span> Jordan Radio
              </h1>
              <p className="text-sm text-gray-400 mt-1">Live radio stations from Jordan</p>
            </div>
            <div className="text-xs text-gray-500">
              {filteredStations.length} stations
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-32">
        {/* Word filter */}
        <GenreFilter
          stations={stations}
          selectedWord={selectedWord}
          onSelectWord={setSelectedWord}
        />

        {/* Station grid */}
        <StationList
          stations={filteredStations}
          currentStation={currentStation}
          onPlay={playStation}
        />
      </main>

      {/* Bottom Player */}
      {currentStation && (
        <Player
          station={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={togglePlayPause}
          volume={muted ? 0 : volume}
          onVolumeChange={handleVolumeChange}
          muted={muted}
          onToggleMute={toggleMute}
          showVolume={true}
        />
      )}
    </div>
  )
}

export default App
