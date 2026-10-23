import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { Cpu, ShieldCheck } from 'lucide-react';

export function Loader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!visible) return null;

  const currentPercent = Math.min(Math.round(progress), 100);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        background: '#000F08',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? 'none' : 'auto',
      }}
    >
      {/* Background cyber grid */}
      <div className="cyber-grid" />
      <div className="cyber-vignette" />

      <div
        className="glass-panel glass-panel-imperial cyber-corner"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          zIndex: 10,
        }}
      >
        {/* Animated Cyber Icon */}
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(251, 54, 64, 0.12)',
            border: '1px solid #FB3640',
            boxShadow: '0 0 24px rgba(251, 54, 64, 0.35)',
          }}
        >
          <Cpu size={32} color="#FB3640" />
          <div className="pulse-ring-effect" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              color: '#FB3640',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            TECHFEST BIOMECHATRONICS // LIVE RIG
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            CALIBRATING 3D RIG
          </h2>
        </div>

        {/* Diagnostic Progress Bar */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#FB3640" />
              SYNCHRONIZING MESH
            </span>
            <span style={{ color: '#FB3640', fontWeight: 700 }}>
              {currentPercent}%
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '3px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${currentPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FB3640, #FF6B6B)',
                boxShadow: '0 0 12px #FB3640',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          [R3F ENGINE] DPR: 2.0 · DRACO PIPELINE · WEBGPU READY
        </div>
      </div>
    </div>
  );
}
