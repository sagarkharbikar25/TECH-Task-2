import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroCanvas } from '../canvas/HeroCanvas';
import { ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { sound } from '../../lib/audio';

export function HeroSection({ onExplore, onRegister, onInspect3D }) {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split characters animation
      const letters = titleRef.current?.querySelectorAll('.char');
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 40, rotateX: -60 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            stagger: 0.035,
            ease: 'back.out(1.7)',
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const headline = "TECHFEST 2026";

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 60px',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Background Canvas */}
      <HeroCanvas />

      {/* Hero Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '920px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Flagship Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '24px',
            background: 'rgba(0, 240, 255, 0.08)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 0 16px rgba(0, 240, 255, 0.15)',
          }}
        >
          <Sparkles size={14} color="#00F0FF" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#00F0FF',
              letterSpacing: '0.18em',
              fontWeight: 700,
            }}
          >
            IIT BOMBAY CALIBER // ASIA'S PREMIER TECH CONCLAVE
          </span>
        </div>

        {/* Dynamic Split Title */}
        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {headline.split('').map((char, index) => (
            <span
              key={index}
              className="char"
              style={{ display: 'inline-block', minWidth: char === ' ' ? '18px' : 'auto' }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '680px',
          }}
        >
          Step into Asia’s pinnacle of science, mechatronics, and artificial intelligence. Explore high-velocity combat arenas, quantum conclaves, and interactive 3D engineering showcases.
        </p>

        {/* CTA Matrix */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginTop: '12px',
          }}
        >
          <button
            onClick={() => {
              sound.playHotspotClick();
              onExplore();
            }}
            className="btn-cyber btn-cyber-primary"
            style={{ padding: '12px 28px', fontSize: '0.85rem' }}
          >
            <Compass size={16} />
            <span>EXPLORE MATRIX</span>
          </button>

          <button
            onClick={() => {
              sound.playSwatchSwitch();
              onInspect3D();
            }}
            className="btn-cyber"
            style={{
              padding: '12px 24px',
              fontSize: '0.85rem',
              borderColor: 'rgba(0, 240, 255, 0.4)',
              color: '#00F0FF',
            }}
          >
            <span>INSPECT 3D CYBORG ARM</span>
          </button>

          <button
            onClick={() => {
              sound.playHotspotClick();
              onRegister();
            }}
            className="btn-cyber"
            style={{ padding: '12px 24px', fontSize: '0.85rem' }}
          >
            <span>REGISTER PASS</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
