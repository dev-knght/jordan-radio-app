const VERSION = 'v1.0.5'

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
      if (audioRef.current.parentNode) {
        audioRef.current.parentNode.removeChild(audioRef.current)
      }
      audioRef.current = null
    }

    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.src = station.liveUrl
    audio.volume = muted ? 0 : volume

    // Handle errors and natural end
    audio.onerror = () => {
      console.error('Audio error:', audio.error)
      setIsPlaying(false)
    }
    audio.onended = () => {
      setIsPlaying(false)
    }

    document.body.appendChild(audio)

    audio.play().catch((err) => {
      console.error('Playback failed:', err)
      setIsPlaying(false)
    })

    audioRef.current = audio
    setCurrentStation(station)
    setIsPlaying(true)
  }, [volume, muted])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Playback failed:', err)
        setIsPlaying(false)
      })
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
        if (audioRef.current.parentNode) {
          audioRef.current.parentNode.removeChild(audioRef.current)
        }
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-dark-800/80 backdrop-blur-lg border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-bold text-accent-500">Jordan Radio</h1>
              <p className="text-[10px] text-gray-500">Version {VERSION}</p>
            </div>
            <input
              type="text"
              placeholder="Search stations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 w-48"
            />
          </div>
          <GenreFilter
            stations={stations}
            selectedWord={selectedWord}
            onSelectWord={setSelectedWord}
          />
        </div>
      </header>

      {/* Main list */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <StationList
          stations={filteredStations}
          currentStation={currentStation}
          isPlaying={isPlaying}
          onPlay={playStation}
        />
      </main>

      {/* Player */}
      {currentStation && (
        <Player
          station={currentStation}
          isPlaying={isPlaying}
          onTogglePlay={togglePlayPause}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          muted={muted}
          onToggleMute={toggleMute}
        />
      )}
    </div>
  )
}

export default App
