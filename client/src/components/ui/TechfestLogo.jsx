import React from 'react';

/**
 * Official High-Tech Techfest Geometric Vector Emblem Logo
 */
export function TechfestLogo({ size = 32, showText = true, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 select-none ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}
    >
      {/* Precision Geometric SVG Shield / Vortex Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.45))' }}
      >
        {/* Outer Hexagonal Shield */}
        <path
          d="M24 3L43 13.5V34.5L24 45L5 34.5V13.5L24 3Z"
          stroke="#00F0FF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Interlocking Nexus Traces */}
        <path
          d="M24 10L36 17V31L24 38L12 31V17L24 10Z"
          stroke="#FB3640"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Central Quantum Core Node */}
        <path
          d="M24 17L30 20.5V27.5L24 31L18 27.5V20.5L24 17Z"
          fill="#00F0FF"
          fillOpacity="0.3"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        <circle cx="24" cy="24" r="2.5" fill="#FB3640" />

        {/* Corner Telemetry Notch Accents */}
        <line x1="24" y1="3" x2="24" y2="10" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
        <line x1="43" y1="13.5" x2="36" y2="17" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="13.5" x2="12" y2="17" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            TECHFEST
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: '#FB3640',
                background: 'rgba(251, 54, 64, 0.15)',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(251, 54, 64, 0.4)',
                fontWeight: 700,
              }}
            >
              2026
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: '#94A3B8',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            CYBERNETIC DIVISION
          </div>
        </div>
      )}
    </div>
  );
}
