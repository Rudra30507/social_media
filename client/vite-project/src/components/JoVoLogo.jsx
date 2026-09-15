import React from 'react'

export const JoVoLogo = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="jovoInstaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd600" />
            <stop offset="20%" stopColor="#ff7a00" />
            <stop offset="45%" stopColor="#ff0069" />
            <stop offset="70%" stopColor="#d300c5" />
            <stop offset="100%" stopColor="#7638fa" />
          </linearGradient>
        </defs>

        {/* Instagram-style Squircle border with gradient */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="26"
          stroke="url(#jovoInstaGrad)"
          strokeWidth="7"
          fill="none"
        />

        {/* Center circle */}
        <circle
          cx="50"
          cy="50"
          r="24"
          stroke="url(#jovoInstaGrad)"
          strokeWidth="7"
          fill="none"
        />

        {/* Top-right flash dot */}
        <circle
          cx="73"
          cy="27"
          r="4.5"
          fill="url(#jovoInstaGrad)"
        />

        {/* Inner subtle peace vertical spoke */}
        <line
          x1="50"
          y1="26"
          x2="50"
          y2="74"
          stroke="url(#jovoInstaGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Inner peace diagonal left spoke */}
        <line
          x1="50"
          y1="50"
          x2="33"
          y2="67"
          stroke="url(#jovoInstaGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Inner peace diagonal right spoke */}
        <line
          x1="50"
          y1="50"
          x2="67"
          y2="67"
          stroke="url(#jovoInstaGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default JoVoLogo
