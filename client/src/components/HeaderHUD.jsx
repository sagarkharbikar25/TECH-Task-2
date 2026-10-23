import React from 'react';
import { RotateCcw, Volume2, VolumeX, Eye, Info, Ticket } from 'lucide-react';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';
import { TechfestLogo } from './ui/TechfestLogo';

export function HeaderHUD({
  onOpenCredits,
  onScrollToTop,
  onScrollToShowcase,
  onScrollToBento,
  onOpenRegister,
}) {
  const isAutoRotating = useSceneStore((state) => state.isAutoRotating);
  const toggleAutoRotate = useSceneStore((state) => state.toggleAutoRotate);
  const resetView = useSceneStore((state) => state.resetView);
  const soundEnabled = useSceneStore((state) => state.soundEnabled);
  const toggleSound = useSceneStore((state) => state.toggleSound);

  const handleReset = (e) => {
    e.stopPropagation();
    sound.playReset();
    resetView();
  };

  const handleToggleAutoRotate = (e) => {
    e.stopPropagation();
    sound.playSwatchSwitch();
    toggleAutoRotate();
  };

  const handleToggleSound = (e) => {
    e.stopPropagation();
    toggleSound();
    sound.enabled = !soundEnabled;
    if (!soundEnabled) {
      sound.playBeep(880, 'sine', 0.1);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 15, 8, 0.78)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        pointerEvents: 'auto',
      }}
    >
      {/* 1. Official Brand Identity with Vector Logo (Click to scroll to top) */}
      <div
        onClick={onScrollToTop}
        title="Scroll to Top"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <TechfestLogo size={34} showText={true} />
      </div>

      {/* 2. Unified Centered Section Navigation (Clean & uncluttered) */}
      <nav
        aria-label="Festival Sections"
        className="header-nav-pills"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '4px 8px',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <button
          onClick={onScrollToShowcase}
          className="btn-cyber"
          style={{ padding: '6px 14px', fontSize: '0.72rem', borderRadius: '20px', color: '#FB3640' }}
        >
          3D CYBORG RIG
        </button>
        <button
          onClick={onScrollToBento}
          className="btn-cyber"
          style={{ padding: '6px 14px', fontSize: '0.72rem', borderRadius: '20px' }}
        >
          ARENAS
        </button>
        <button
          onClick={onOpenRegister}
          className="btn-cyber btn-cyber-primary"
          style={{ padding: '6px 16px', fontSize: '0.72rem', borderRadius: '20px' }}
        >
          <Ticket size={13} />
          <span>PASS</span>
        </button>
      </nav>

      {/* 3. Top Right HUD Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Reset Camera View */}
        <button
          onClick={handleReset}
          className="btn-cyber"
          title="Reset Camera to Overview"
          aria-label="Reset Camera"
        >
          <RotateCcw size={14} color="#FB3640" />
          <span className="hud-btn-label">RESET</span>
        </button>

        {/* Orbit ON/OFF Toggle */}
        <button
          onClick={handleToggleAutoRotate}
          className="btn-cyber"
          title={isAutoRotating ? 'Click to Disable Auto-Orbit' : 'Click to Enable Auto-Orbit'}
          aria-label="Toggle Auto-Orbit"
          style={{
            borderColor: isAutoRotating ? '#00F0FF' : 'rgba(255, 255, 255, 0.1)',
            background: isAutoRotating ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Eye size={14} color={isAutoRotating ? '#00F0FF' : '#94A3B8'} />
          <span
            className="hud-btn-label"
            style={{ color: isAutoRotating ? '#00F0FF' : '#94A3B8', fontWeight: 700 }}
          >
            {isAutoRotating ? 'ORBIT: ON' : 'ORBIT: OFF'}
          </span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className="btn-cyber"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? (
            <Volume2 size={14} color="#FB3640" />
          ) : (
            <VolumeX size={14} color="#64748B" />
          )}
        </button>

        {/* Specs Modal Trigger */}
        <button
          onClick={onOpenCredits}
          className="btn-cyber"
          title="Show System Telemetry"
          aria-label="Show Specs"
        >
          <Info size={14} color="#94A3B8" />
        </button>
      </div>
    </header>
  );
}
