import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';
import { getHotspotIcon } from './ui/CyberIcons';

export function HotspotCard() {
  const selectedHotspot = useSceneStore((state) => state.selectedHotspot);
  const setSelectedHotspot = useSceneStore((state) => state.setSelectedHotspot);
  const resetView = useSceneStore((state) => state.resetView);

  if (!selectedHotspot) return null;

  const handleClose = () => {
    sound.playReset();
    setSelectedHotspot(null);
  };

  const handleReset = () => {
    sound.playReset();
    resetView();
  };

  const telemetry = selectedHotspot.telemetry || {};

  return (
    <section
      className="glass-panel glass-panel-imperial cyber-corner"
      aria-label="Actuator Diagnostics"
      style={{
        position: 'absolute',
        top: '84px',
        right: '24px',
        width: '360px',
        maxWidth: 'calc(100vw - 48px)',
        zIndex: 25,
        padding: '24px',
        animation: 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: '4px solid #FB3640',
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#FB3640',
              fontWeight: 700,
              letterSpacing: '0.12em',
              background: 'rgba(251, 54, 64, 0.1)',
              padding: '3px 8px',
              borderRadius: '4px',
              marginBottom: '6px',
            }}
          >
            {getHotspotIcon(selectedHotspot.code, { size: 14, color: '#FB3640' })}
            {selectedHotspot.code}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {selectedHotspot.label}
          </h2>
        </div>

        <button
          onClick={handleClose}
          className="btn-cyber"
          aria-label="Close Inspector Card"
          style={{
            padding: '6px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <X size={16} color="#94A3B8" />
        </button>
      </div>

      {/* Telemetry Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px',
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {Object.entries(telemetry).map(([key, val]) => (
          <div key={key}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '2px',
              }}
            >
              {key}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#FB3640',
              }}
            >
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Spec Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.86rem',
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          marginBottom: '20px',
        }}
      >
        {selectedHotspot.info}
      </p>

      {/* Card Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={handleReset}
          className="btn-cyber"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <span>OVERVIEW</span>
        </button>
        <button
          onClick={() => {
            sound.playHotspotClick();
          }}
          className="btn-cyber btn-cyber-primary"
          style={{ flex: 1.2, justifyContent: 'center' }}
        >
          <CheckCircle2 size={14} />
          <span>DIAGNOSTIC OK</span>
        </button>
      </div>
    </section>
  );
}
