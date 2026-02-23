export default function DefaultIcon() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl text-accent-500">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="h-12 w-12"
      >
        {/* Mast */}
        <path d="M8 1v14" />
        {/* Horizontal bars */}
        <path d="M4 5h8" />
        <path d="M4 8h8" />
        <path d="M4 11h8" />
      </svg>
    </div>
  )
}
