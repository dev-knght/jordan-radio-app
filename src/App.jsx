import { useState, useEffect, useCallback } from 'react'
import StationList from './components/StationList'
import Player from './components/Player'
import stationsData from './data/stations.json'

function App() {
  const [stations] = useState(stationsData)
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState(null)

  const playStation = useCallback((station) => {
    if (audio) {
      audio.pause()
      audio.remove()
    }
    const newAudio = new Audio(station.liveUrl)
    newAudio.play().catch((err) => {
      console.error('Playback failed:', err)
      setIsPlaying(false)
    })
    setAudio(newAudio)
    setCurrentStation(station)
    setIsPlaying(true)
  }, [audio])

  const togglePlayPause = useCallback(() => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((err) => console.error('Playback failed:', err))
    }
    setIsPlaying(!isPlaying)
  }, [audio, isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        audio.remove()
      }
    }
  }, [audio])

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-600 px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <span>🇯🇴</span> Jordan Radio
        </h1>
        <p className="text-sm text-gray-400 mt-1">Live radio stations from Jordan</p>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-32">
        <StationList
          stations={stations}
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
        />
      )}
    </div>
  )
}

export default App