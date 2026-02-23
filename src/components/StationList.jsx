import StationCard from './StationCard'

function StationList({ stations, currentStation, onPlay }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          isPlaying={currentStation?.id === station.id}
          onPlay={onPlay}
        />
      ))}
    </div>
  )
}

export default StationList