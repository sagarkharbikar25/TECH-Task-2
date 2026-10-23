import React from 'react';
import { RotateCcw, Volume2, VolumeX, Eye, Info } from 'lucide-react';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';
import { TechfestLogo } from './ui/TechfestLogo';

export function HeaderHUD({ onOpenCredits }) {
  const isAutoRotating = useSceneStore((state) => state.isAutoRotating);
  const toggleAutoRotate = useSceneStore((state) => state.toggleAutoRotate);
  const resetView = useSceneStore((state) => state.resetView);
  const soundEnabled = useSceneStore((state) => state.soundEnabled);
  const toggleSound = useSceneStore((state) => state.toggleSound);

  const handleReset = () => {
    sound.playReset();
    resetView();
  };

  const handleToggleSound = () => {
    toggleSound();
    sound.enabled = !soundEnabled;
    if (!soundEnabled) {
      sound.playBeep(880, 'sine', 0.1);
    }
  };

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
      }}
    >
      {/* Official Brand Identity with Vector Logo */}
      <div
        className="glass-panel"
        style={{
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          pointerEvents: 'auto',
          borderLeft: '3px solid #00F0FF',
        }}
      >
        <TechfestLogo size={34} showText={true} />
      </div>

      {/* Top HUD Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
        }}
      >
        {/* Reset Camera View */}
        <button
          onClick={handleReset}
          className="btn-cyber"
          title="Reset Camera to Overview"
          aria-label="Reset Camera"
        >
          <RotateCcw size={15} color="#FB3640" />
          <span className="hud-btn-label">RESET VIEW</span>
        </button>

        {/* Auto-Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className="btn-cyber"
          title={isAutoRotating ? 'Pause Auto-Rotate' : 'Enable Auto-Rotate'}
          aria-label="Toggle Auto-Rotate"
          style={{
            borderColor: isAutoRotating ? 'rgba(0, 240, 255, 0.4)' : undefined,
          }}
        >
          <Eye size={15} color={isAutoRotating ? '#00F0FF' : '#94A3B8'} />
          <span className="hud-btn-label">
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
            <Volume2 size={15} color="#FB3640" />
          ) : (
            <VolumeX size={15} color="#64748B" />
          )}
        </button>

        {/* Specs Modal Trigger */}
        <button
          onClick={onOpenCredits}
          className="btn-cyber"
          title="Show System Telemetry"
          aria-label="Show Specs"
        >
          <Info size={15} color="#94A3B8" />
        </button>
      </div>
    </header>
  );
}
