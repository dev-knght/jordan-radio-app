export default function DefaultIcon() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl text-accent-500">
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-12 w-12"
      >
        <path d="M8 2a.5.5 0 0 1 .5.5v5l2.5 1.5-.5.5-3-2 3-2 .5.5L8 7.5V2.5A.5.5 0 0 1 8 2z" />
      </svg>
    </div>
  )
}
