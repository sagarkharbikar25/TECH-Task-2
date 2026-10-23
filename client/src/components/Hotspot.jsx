import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';
import { ReticleIcon } from './ui/CyberIcons';

export function Hotspot({ hotspot }) {
  const [hovered, setHovered] = useState(false);
  const selectedHotspot = useSceneStore((state) => state.selectedHotspot);
  const setSelectedHotspot = useSceneStore((state) => state.setSelectedHotspot);

  const isSelected = selectedHotspot?.id === hotspot.id;
  const accentColor = isSelected ? '#00F0FF' : '#FB3640';

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playHotspotClick();
    if (isSelected) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hotspot);
    }
  };

  return (
    <group position={hotspot.position}>
      <Html
        center
        zIndexRange={[100, 0]}
        style={{
          transition: 'all 0.2s ease',
          pointerEvents: 'auto',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div
          onClick={handleClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label={`Inspect ${hotspot.label}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(e);
            }
          }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            transform: isSelected || hovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {/* High-Precision Sci-Fi Vector SVG Reticle */}
          <ReticleIcon
            size={isSelected ? 36 : 28}
            color={accentColor}
            isSelected={isSelected}
            className={isSelected ? 'animate-spin' : ''}
          />

          {/* Compact HUD Tooltip on hover only (Hidden when selected to keep 3D view clean) */}
          {hovered && !isSelected && (
            <div
              style={{
                position: 'absolute',
                left: '36px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 15, 8, 0.94)',
                border: `1px solid ${accentColor}`,
                borderRadius: '6px',
                padding: '4px 10px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                boxShadow: `0 4px 16px rgba(0, 0, 0, 0.8), 0 0 10px ${accentColor}40`,
                backdropFilter: 'blur(8px)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-mono)',
                  color: accentColor,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  lineHeight: 1.2,
                }}
              >
                {hotspot.code}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {hotspot.label}
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
