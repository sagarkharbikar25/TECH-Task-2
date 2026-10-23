import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Cpu, ShieldCheck } from 'lucide-react';
import { sound } from '../../lib/audio';

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________010101XYZ";

export function CustomPreloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);

  const [percent, setPercent] = useState(0);
  const [displayText, setDisplayText] = useState("INIT_SYSTEM_KERNEL");

  const scramble = (finalText) => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        finalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return finalText[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2.5;
    }, 25);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const state = { value: 0 };
      const phrases = [
        "QUANTUM_CORE_LOADING",
        "SYNCING_NEURAL_NODES",
        "CALIBRATING_R3F_SHADERS",
        "IIT_TECHFEST_READY"
      ];

      const tl = gsap.timeline({
        onComplete: () => {
          sound.playReset();
          // GSAP clip-path polygon curtain reveal exit animation
          gsap.to(containerRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });
        },
      });

      tl.to(state, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(state.value);
          setPercent(currentVal);

          if (currentVal === 20) scramble(phrases[0]);
          if (currentVal === 50) scramble(phrases[1]);
          if (currentVal === 80) scramble(phrases[2]);
          if (currentVal === 98) scramble(phrases[3]);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#08080C',
        color: '#F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '36px',
        userSelect: 'none',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {/* Background Cyber Grid */}
      <div className="cyber-grid" style={{ opacity: 0.15 }} />
      <div className="cyber-vignette" />

      {/* Top Telemetry Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#94A3B8',
          letterSpacing: '0.15em',
          zIndex: 10,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00F0FF',
              boxShadow: '0 0 10px #00F0FF',
            }}
          />
          TECHFEST 2026 // CYBERNETIC KERNEL
        </span>
        <span style={{ color: '#FB3640' }}>SYS_FPS: 60 · LATENCY: 0.42ms</span>
      </div>

      {/* Center Kinetic Readout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <span
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4.5rem, 12vw, 9.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #00F0FF 0%, #FFFFFF 45%, #FB3640 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
          }}
        >
          {String(percent).padStart(3, '0')}%
        </span>

        <h2
          ref={textRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            letterSpacing: '0.35em',
            color: '#00F0FF',
            marginTop: '16px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {displayText}
        </h2>
      </div>

      {/* Bottom Diagnostics Progress Bar */}
      <div style={{ width: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={14} color="#FB3640" />
            HYDRATING THREE.JS WEBGL CONTEXT
          </span>
          <span style={{ color: '#00F0FF', fontWeight: 700 }}>STAGE 0{percent < 50 ? '1' : '2'} / 02</span>
        </div>

        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: `${percent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00F0FF, #FFFFFF, #FB3640)',
              boxShadow: '0 0 16px #FB3640',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
