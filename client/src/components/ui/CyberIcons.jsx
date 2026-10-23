import React from 'react';

/**
 * Custom High-Precision Sci-Fi / Cybernetic SVG Icon System
 * Features vector crispness at any DPR, CSS variable color support, and micro-animations.
 */

export function ReticleIcon({ size = 28, color = '#00F0FF', isSelected = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
    >
      {/* Outer rotating dashed tracking circle */}
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="6 4"
        opacity="0.85"
      />

      {/* Inner Target Ring */}
      <circle
        cx="20"
        cy="20"
        r="11"
        stroke={color}
        strokeWidth="1"
        opacity="0.6"
      />

      {/* 4 Optical Crosshair Reticles */}
      <line x1="20" y1="2" x2="20" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="33" x2="20" y2="38" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="20" x2="7" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="33" y1="20" x2="38" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Center Precision Target Pip */}
      <circle
        cx="20"
        cy="20"
        r={isSelected ? 4.5 : 3}
        fill={color}
      />
    </svg>
  );
}

export function ServoIcon({ size = 20, color = '#FB3640', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" fill={`${color}20`} />
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function SynapseIcon({ size = 20, color = '#00F0FF', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="2.5" fill={`${color}30`} />
      <circle cx="6" cy="17" r="2.5" fill={`${color}30`} />
      <circle cx="18" cy="17" r="2.5" fill={`${color}30`} />
      <path d="M12 8.5v3M10 13l-2.5 2M14 13l2.5 2" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <path d="M7 6c2-3 8-3 10 0" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

export function ReactorIcon({ size = 20, color = '#FB3640', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" fill={color} />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(90 12 12)" />
    </svg>
  );
}

export function CarapaceIcon({ size = 20, color = '#FB3640', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l7 4v6c0 5.25-3.5 10-7 11-3.5-1-7-5.75-7-11V6l7-4z" fill={`${color}15`} />
      <path d="M12 6l4 2.5v4.5L12 15.5 8 13V8.5L12 6z" />
      <path d="M12 2v4M12 15.5v5.5" />
    </svg>
  );
}

export function StabilizerIcon({ size = 20, color = '#00F0FF', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="3" width="10" height="7" rx="1.5" fill={`${color}20`} />
      <rect x="9" y="10" width="6" height="8" />
      <path d="M12 18v4M6 22h12M4 7h3M17 7h3" />
    </svg>
  );
}

export function RobowarsIcon({ size = 24, color = '#FB3640', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" fill={`${color}20`} />
      <path d="M12 2l2 4 4-2-1 4.5 4 1.5-3 3 3 3-4 1.5 1 4.5-4-2-2 4-2-4-4 2 1-4.5-4-1.5 3-3-3-3 4-1.5-1-4.5 4 2z" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

export function DroneIcon({ size = 24, color = '#00F0FF', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" fill={`${color}20`} />
      <path d="M6 6l4 4M18 6l-4 4M6 18l4-4M18 18l-4-4" />
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
    </svg>
  );
}

export function getHotspotIcon(code, props = {}) {
  switch (code) {
    case 'ACTUATOR-01':
      return <ServoIcon {...props} />;
    case 'SYNAPSE-02':
      return <SynapseIcon {...props} />;
    case 'REACTOR-03':
      return <ReactorIcon {...props} />;
    case 'CARAPACE-04':
      return <CarapaceIcon {...props} />;
    case 'STABILIZER-05':
      return <StabilizerIcon {...props} />;
    default:
      return <ServoIcon {...props} />;
  }
}
