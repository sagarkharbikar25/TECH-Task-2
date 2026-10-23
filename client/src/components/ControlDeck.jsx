import React from 'react';
import { Layers, Sun, Shield, Crosshair } from 'lucide-react';
import { useSceneStore } from '../store/useSceneStore';
import { sound } from '../lib/audio';

export function ControlDeck() {
  const modelData = useSceneStore((state) => state.modelData);
  const activeMaterial = useSceneStore((state) => state.activeMaterial);
  const setActiveMaterial = useSceneStore((state) => state.setActiveMaterial);
  const selectedHotspot = useSceneStore((state) => state.selectedHotspot);
  const setSelectedHotspot = useSceneStore((state) => state.setSelectedHotspot);
  const wireframe = useSceneStore((state) => state.wireframe);
  const toggleWireframe = useSceneStore((state) => state.toggleWireframe);
  const lightingPreset = useSceneStore((state) => state.lightingPreset);
  const setLightingPreset = useSceneStore((state) => state.setLightingPreset);

  const materials = modelData?.materials || [];
  const hotspots = modelData?.hotspots || [];

  const handleSelectMaterial = (mat) => {
    sound.playSwatchSwitch();
    setActiveMaterial(mat);
  };

  const handleSelectHotspot = (hs) => {
    sound.playHotspotClick();
    if (selectedHotspot?.id === hs.id) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hs);
    }
  };

  return (
    <aside
      className="glass-panel"
      aria-label="Scene Controls"
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        maxWidth: 'calc(100% - 32px)',
        overflowX: 'auto',
      }}
    >
      {/* 1. Material Finish Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          <Layers size={13} color="#FB3640" />
          FINISH
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {materials.map((mat) => {
            const isSelected = activeMaterial?.id === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => handleSelectMaterial(mat)}
                title={`${mat.name} - ${mat.subtitle}`}
                aria-label={`Select ${mat.name} finish`}
                style={{
                  position: 'relative',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: mat.color,
                  border: isSelected ? '2px solid #FFFFFF' : '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: isSelected
                    ? `0 0 16px ${mat.accentColor || '#FB3640'}, 0 0 0 2px rgba(251, 54, 64, 0.5)`
                    : 'none',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.2s var(--ease-spring)',
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)' }} />

      {/* 2. Hotspot Quick Selector Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          <Crosshair size={13} color="#00F0FF" />
          ACTUATORS
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {hotspots.map((hs) => {
            const isSelected = selectedHotspot?.id === hs.id;
            return (
              <button
                key={hs.id}
                onClick={() => handleSelectHotspot(hs)}
                className={`btn-cyber ${isSelected ? 'btn-cyber-primary' : ''}`}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {hs.code}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)' }} />

      {/* 3. Toggles: Wireframe & Lighting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={toggleWireframe}
          className="btn-cyber"
          title="Toggle Wireframe Mesh"
          aria-label="Toggle Wireframe"
          style={{
            borderColor: wireframe ? '#FB3640' : undefined,
            background: wireframe ? 'rgba(251, 54, 64, 0.15)' : undefined,
            padding: '6px 10px',
            fontSize: '0.72rem',
          }}
        >
          <Shield size={13} color={wireframe ? '#FB3640' : '#94A3B8'} />
          <span>WIREFRAME</span>
        </button>

        <button
          onClick={() => {
            const presets = ['city', 'warehouse', 'night'];
            const next = presets[(presets.indexOf(lightingPreset) + 1) % presets.length];
            setLightingPreset(next);
            sound.playSwatchSwitch();
          }}
          className="btn-cyber"
          title={`Cycle Lighting Preset (Current: ${lightingPreset})`}
          aria-label="Cycle Lighting"
          style={{
            padding: '6px 10px',
            fontSize: '0.72rem',
          }}
        >
          <Sun size={13} color="#94A3B8" />
          <span style={{ textTransform: 'uppercase' }}>{lightingPreset}</span>
        </button>
      </div>
    </aside>
  );
}
