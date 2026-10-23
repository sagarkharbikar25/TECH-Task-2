import React, { useEffect, useState, useRef } from 'react';
import { CustomPreloader } from './components/preloader/CustomPreloader';
import { HeroSection } from './components/sections/HeroSection';
import { FlagshipPinning } from './components/sections/FlagshipPinning';
import { BentoGrid } from './components/sections/BentoGrid';
import { RegistrationPortal } from './components/sections/RegistrationPortal';
import { Scene } from './components/Scene';
import { HeaderHUD } from './components/HeaderHUD';
import { ControlDeck } from './components/ControlDeck';
import { HotspotCard } from './components/HotspotCard';
import { SpecsModal } from './components/SpecsModal';
import { WebGLFallback } from './components/WebGLFallback';
import { useSceneStore } from './store/useSceneStore';
import { fetchModels } from './lib/api';
import { initSmoothScroll } from './lib/lenis';
import { Box, Layers, Ticket, Sparkles } from 'lucide-react';
import { sound } from './lib/audio';
import './styles/theme.css';

function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function App() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('all');

  const setModelData = useSceneStore((state) => state.setModelData);

  const showcaseRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    setHasWebGL(checkWebGL());

    // Fetch model metadata
    fetchModels().then((data) => {
      setModelData(data);
    });

    // Initialize Lenis virtual smooth scroll
    const lenis = initSmoothScroll();
    return () => {
      if (lenis) lenis.destroy();
    };
  }, [setModelData]);

  const scrollTo3DShowcase = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBento = () => {
    if (bentoRef.current) {
      bentoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--bg-night)',
        color: '#FFFFFF',
      }}
    >
      {/* 1. Kinetic Scramble Splash Preloader */}
      {!isPreloaded && (
        <CustomPreloader onComplete={() => setIsPreloaded(true)} />
      )}

      {/* Cyber Grid & Atmospheric Vignette */}
      <div className="cyber-grid" />
      <div className="cyber-vignette" />

      {/* Persistent Navigation HUD */}
      <HeaderHUD onOpenCredits={() => setIsSpecsOpen(true)} />

      {/* Floating Section Quick-Jump Pills */}
      <nav
        aria-label="Section Quick Links"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          display: 'flex',
          gap: '8px',
          background: 'rgba(0, 15, 8, 0.75)',
          padding: '6px 12px',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-cyber"
          style={{ padding: '4px 12px', fontSize: '0.72rem', borderRadius: '20px' }}
        >
          CORE
        </button>
        <button
          onClick={scrollTo3DShowcase}
          className="btn-cyber"
          style={{ padding: '4px 12px', fontSize: '0.72rem', borderRadius: '20px', color: '#FB3640' }}
        >
          3D CYBORG RIG
        </button>
        <button
          onClick={scrollToBento}
          className="btn-cyber"
          style={{ padding: '4px 12px', fontSize: '0.72rem', borderRadius: '20px' }}
        >
          ARENAS
        </button>
        <button
          onClick={() => {
            sound.playHotspotClick();
            setIsRegisterOpen(true);
          }}
          className="btn-cyber btn-cyber-primary"
          style={{ padding: '4px 12px', fontSize: '0.72rem', borderRadius: '20px' }}
        >
          PASS
        </button>
      </nav>

      {/* 2. Full-Viewport Hero Section with 3D Quantum Canvas */}
      <HeroSection
        onExplore={scrollToBento}
        onRegister={() => setIsRegisterOpen(true)}
        onInspect3D={scrollTo3DShowcase}
      />

      {/* 3. Interactive 3D Cyborg Arm Showcase */}
      <section
        ref={showcaseRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#000F08',
          borderTop: '1px solid rgba(251, 54, 64, 0.2)',
          borderBottom: '1px solid rgba(251, 54, 64, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Section Watermark Title */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#FB3640',
              letterSpacing: '0.15em',
            }}
          >
            BIOMECHATRONIC 3D PRODUCT VIEWER // REAL-TIME INSPECTION
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            CYBORG ARM MK-VIII // ARES
          </h2>
        </div>

        {/* 3D Scene Viewport */}
        <Scene />

        {/* Floating Bottom Control Deck */}
        <ControlDeck />

        {/* Actuator Diagnostic Inspection Card */}
        <HotspotCard />
      </section>

      {/* 4. Scroll-Triggered Horizontal Pinning Showcase (Robowars, Drones, Humanoid Conclave) */}
      <FlagshipPinning
        onSelectEvent={(item) => {
          setSelectedTrack(item.title);
          setIsRegisterOpen(true);
        }}
      />

      {/* 5. Asymmetrical Bento Grid Portfolio */}
      <div ref={bentoRef}>
        <BentoGrid
          onSelectCard={(track) => {
            setSelectedTrack(track);
            setIsRegisterOpen(true);
          }}
        />
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '48px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          background: '#04070A',
        }}
      >
        <div style={{ marginBottom: '12px', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.1em' }}>
          TECHFEST 2026 // ASIA'S LARGEST SCIENCE & TECHNOLOGY FESTIVAL
        </div>
        <div>
          Engineered with React 19 · Three.js · React Three Fiber · GSAP ScrollTrigger · Lenis · Zustand · Express API
        </div>
      </footer>

      {/* Modals */}
      <SpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      <RegistrationPortal
        isOpen={isRegisterOpen}
        defaultTrack={selectedTrack}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

export default App;
