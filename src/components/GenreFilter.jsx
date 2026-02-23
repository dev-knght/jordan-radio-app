import { useMemo } from 'react'

function GenreFilter({ stations, selectedWord, onSelectWord }) {
  const words = useMemo(() => {
    const set = new Set()
    stations.forEach((s) => {
      if (s.genre) {
        s.genre.split(/[\/,|]+/).forEach((w) => {
          const clean = w.trim()
          if (clean) set.add(clean)
        })
      }
    })
    return ['All', ...Array.from(set).sort()]
  }, [stations])

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => onSelectWord(word === 'All' ? null : word)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${selectedWord === (word === 'All' ? null : word)
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25 scale-105'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
              }
            `}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenreFilter
