import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function WebGLFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000F08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#FFFFFF',
      }}
    >
      <div
        className="glass-panel glass-panel-imperial"
        style={{
          maxWidth: '480px',
          padding: '36px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(251, 54, 64, 0.15)',
            border: '1px solid #FB3640',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AlertTriangle size={32} color="#FB3640" />
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: '#FFFFFF',
          }}
        >
          WebGL Acceleration Unavailable
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          The 3D Cybernetic Showcase requires hardware-accelerated WebGL. Please ensure hardware acceleration is enabled in your browser settings or update your graphics driver.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="btn-cyber btn-cyber-primary"
          style={{ marginTop: '12px' }}
        >
          <RefreshCw size={16} />
          RETRY CONNECTION
        </button>
      </div>
    </div>
  );
}
