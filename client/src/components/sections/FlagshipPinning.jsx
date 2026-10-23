import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swords, Radio, Cpu, Sparkles, Trophy } from 'lucide-react';
import { sound } from '../../lib/audio';

gsap.registerPlugin(ScrollTrigger);

const FLAGSHIP_ITEMS = [
  {
    id: 'robowars',
    code: 'FLAGSHIP_01',
    title: 'ROBOWARS // TITAN ARENA',
    subtitle: '60KG FULL-COMBAT CRUSHERS',
    prize: '₹5,00,000 PRIZE POOL',
    icon: Swords,
    accent: '#FB3640',
    description: 'Armored combat chassis clash inside a bulletproof polycarbonate arena. High-pressure pneumatic flippers, hardened AR400 spinning drums, and zero mercy.',
    stats: { weightClass: '60 kg', arenaSize: '30x30 ft', weaponRPM: '10,000 RPM' },
  },
  {
    id: 'drones',
    code: 'FLAGSHIP_02',
    title: 'NEON DRONE GRAND PRIX',
    subtitle: 'INTERNATIONAL FPV PYLON RACING',
    prize: '₹3,50,000 PRIZE POOL',
    icon: Radio,
    accent: '#00F0FF',
    description: 'High-speed autonomous and FPV micro-drones weaving through illuminated neon chicanes at over 140 km/h with sub-second optical lap timing.',
    stats: { topSpeed: '160 km/h', trackLength: '850 m', pilotCount: '64 Global' },
  },
  {
    id: 'humanoid',
    code: 'FLAGSHIP_03',
    title: 'HUMANOID CONCLAVE',
    subtitle: 'BIOMIMETIC AI & NEURAL GAIT',
    prize: 'KEYNOTE SUMMIT',
    icon: Cpu,
    accent: '#9D4EDD',
    description: 'Pioneers from global robotics institutes demonstrating bipedal reinforcement learning, dynamic balance recovery, and tactile robotic prosthetics.',
    stats: { delegates: '2,500+', labsRepresented: '24', liveDemos: '12' },
  },
  {
    id: 'hackathon',
    code: 'FLAGSHIP_04',
    title: 'QUANTUM HACK 48H',
    subtitle: 'DECENTRALIZED QUANTUM MATRIX',
    prize: '₹4,00,000 + INCUBATION',
    icon: Trophy,
    accent: '#00F0FF',
    description: 'Non-stop 48-hour hardware and algorithm sprint building post-quantum cryptography, brain-computer interfaces, and autonomous agent swarms.',
    stats: { teams: '120 Finalists', duration: '48 Hours', computeCredits: '$50,000' },
  },
];

export function FlagshipPinning({ onSelectEvent }) {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: () => `-${(FLAGSHIP_ITEMS.length - 1) * 75}vw`,
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${FLAGSHIP_ITEMS.length * 800}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} style={{ overflow: 'hidden', background: '#05080C' }}>
      <div
        ref={sectionRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          width: `${FLAGSHIP_ITEMS.length * 75}vw`,
          padding: '0 8vw',
          gap: '5vw',
        }}
      >
        {FLAGSHIP_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel glass-panel-imperial cyber-corner"
              style={{
                width: '65vw',
                maxWidth: '720px',
                minWidth: '320px',
                padding: '48px',
                flexShrink: 0,
                borderLeft: `4px solid ${item.accent}`,
                background: 'rgba(5, 12, 18, 0.88)',
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px ${item.accent}20`,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: item.accent,
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                  }}
                >
                  {item.code} // PINNED HIGHLIGHT
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: `1px solid ${item.accent}50`,
                    background: `${item.accent}15`,
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  {item.prize}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '8px',
                }}
              >
                {item.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: item.accent,
                  marginBottom: '20px',
                  letterSpacing: '0.08em',
                }}
              >
                {item.subtitle}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '28px',
                }}
              >
                {item.description}
              </p>

              {/* Telemetry Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '28px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {Object.entries(item.stats).map(([k, v]) => (
                  <div key={k}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        marginBottom: '4px',
                      }}
                    >
                      {k.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#F1F5F9',
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  sound.playHotspotClick();
                  if (onSelectEvent) onSelectEvent(item);
                }}
                className="btn-cyber btn-cyber-primary"
                style={{ padding: '12px 24px' }}
              >
                <Icon size={16} />
                <span>ENTER ARENA // REGISTER</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
