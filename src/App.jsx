import { useState, useEffect, useCallback, useMemo } from 'react'
import StationList from './components/StationList'
import Player from './components/Player'
import GenreFilter from './components/GenreFilter'
import stationsData from './data/stations.json'

function App() {
  const [stations] = useState(stationsData)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [currentStation, setCurrentStation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState(null)

  const filteredStations = useMemo(() => {
    if (!selectedGenre) return stations
    return stations.filter((s) => s.genre === selectedGenre)
  }, [stations, selectedGenre])

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
    <div className="min-h-screen bg-gradient-to-b from-dark-900 to-dark-800 text-white flex flex-col">
      {/* Header */}
      <header className="bg-dark-800/80 backdrop-blur-md border-b border-dark-600 px-4 py-4 sticky top-0 z-40">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
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
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-32">
        {/* Genre filter */}
        <GenreFilter
          stations={stations}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
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
        />
      )}
    </div>
  )
}

export default App
