import React, { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1400)
    const t2 = setTimeout(() => onDone(), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 pointer-events-none ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 72, height: 72 }}>
          <rect width="80" height="80" rx="20" fill="#EFF6FF" />
          <path
            d="M40 12 L64 28 L64 64 L16 64 L16 28 Z"
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="40" cy="51" r="6" fill="#2563EB" />
        </svg>
        <span
          className="text-zinc-900 select-none"
          style={{ fontSize: '1.5rem', fontWeight: 300, letterSpacing: '-0.03em' }}
        >
          kasei
        </span>
      </div>
    </div>
  )
}
