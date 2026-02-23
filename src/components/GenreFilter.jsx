import { useMemo } from 'react'

function GenreFilter({ stations, selectedGenre, onSelectGenre }) {
  const genres = useMemo(() => {
    const unique = new Set()
    stations.forEach((s) => {
      if (s.genre) unique.add(s.genre)
    })
    return ['All', ...Array.from(unique).sort()]
  }, [stations])

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre === 'All' ? null : genre)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${selectedGenre === (genre === 'All' ? null : genre)
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25 scale-105'
                : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
              }
            `}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GenreFilter
