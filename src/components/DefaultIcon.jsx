export const DEFAULT_ICON = () => (
  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl">
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
    >
      {/* Radio waves */}
      <path
        d="M48 16c0 8.837-7.163 16-16 16"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M48 20c0 6.627-5.373 12-12 12"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M48 24c0 4.418-3.582 8-8 8"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Antenna mast */}
      <path
        d="M16 48V24"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Base */}
      <path
        d="M12 48h20v4H12z"
        fill="#10b981"
      />
      {/* Small radiating element */}
      <circle cx="20" cy="24" r="2" fill="#10b981" />
    </svg>
  </div>
)

export default DEFAULT_ICON
