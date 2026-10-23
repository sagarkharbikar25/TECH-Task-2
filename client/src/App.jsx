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
import { initSmoothScroll, scrollToTarget } from './lib/lenis';
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

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  const scrollTo3DShowcase = () => {
    if (showcaseRef.current) {
      scrollToTarget(showcaseRef.current);
    }
  };

  const scrollToBento = () => {
    if (bentoRef.current) {
      scrollToTarget(bentoRef.current);
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

      {/* 2. Unified Header HUD (No Overlapping Elements) */}
      <HeaderHUD
        onOpenCredits={() => setIsSpecsOpen(true)}
        onScrollToTop={scrollToTop}
        onScrollToShowcase={scrollTo3DShowcase}
        onScrollToBento={scrollToBento}
        onOpenRegister={() => {
          sound.playHotspotClick();
          setIsRegisterOpen(true);
        }}
      />

      {/* 3. Full-Viewport Hero Section with 3D Quantum Canvas */}
      <HeroSection
        onExplore={scrollToBento}
        onRegister={() => setIsRegisterOpen(true)}
        onInspect3D={scrollTo3DShowcase}
      />

      {/* 4. Interactive 3D Cyborg Arm Showcase */}
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
            top: '76px',
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

      {/* 5. Scroll-Triggered Horizontal Pinning Showcase (Robowars, Drones, Humanoid Conclave) */}
      <FlagshipPinning
        onSelectEvent={(item) => {
          setSelectedTrack(item.title);
          setIsRegisterOpen(true);
        }}
      />

      {/* 6. Asymmetrical Bento Grid Portfolio */}
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
