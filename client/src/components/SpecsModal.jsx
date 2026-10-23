import React from 'react';
import { X, ShieldAlert, Cpu, Award, ExternalLink } from 'lucide-react';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';

export function SpecsModal({ isOpen, onClose }) {
  const modelData = useSceneStore((state) => state.modelData);

  if (!isOpen) return null;

  const handleClose = () => {
    sound.playReset();
    onClose();
  };

  const specs = modelData?.specs || {};

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 15, 8, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        className="glass-panel glass-panel-imperial cyber-corner"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          borderLeft: '4px solid #FB3640',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#FB3640',
                letterSpacing: '0.15em',
                marginBottom: '4px',
              }}
            >
              TECHFEST 2026 // BIOMECHATRONIC HARDWARE SPECIFICATION
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              {modelData?.name || 'CYBER-ARM MK-VIII'}
            </h2>
          </div>

          <button
            onClick={handleClose}
            className="btn-cyber"
            style={{ padding: '8px', borderRadius: '50%' }}
          >
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        {/* Overview */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          {modelData?.description}
        </p>

        {/* Technical Specifications Grid */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#FB3640',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cpu size={14} />
            HARDWARE TELEMETRY
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}
                >
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#F1F5F9',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stack & Architecture */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#00F0FF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Award size={14} />
            STACK ARCHITECTURE
          </h3>

          <div
            style={{
              background: 'rgba(0, 240, 255, 0.04)',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              borderRadius: '8px',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            <div>• Three.js · @react-three/fiber · @react-three/drei</div>
            <div>• Zustand State Management</div>
            <div>• Express.js REST API with Live Metadata</div>
            <div>• Color Palette: Night (#000F08) & Imperial Red (#FB3640)</div>
            <div>• Space Grotesk · Plus Jakarta Sans · JetBrains Mono</div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleClose}
          className="btn-cyber btn-cyber-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
        >
          RETURN TO 3D INSPECTION
        </button>
      </div>
    </div>
  );
}
