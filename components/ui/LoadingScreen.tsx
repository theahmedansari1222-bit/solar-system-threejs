"use client"

export function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <div className="mb-4 text-5xl" role="img" aria-label="Loading solar system">
          <svg
            className="mx-auto h-12 w-12 animate-spin text-white/60"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-sm text-white/60">Loading Solar System...</p>
      </div>
    </div>
  )
}
