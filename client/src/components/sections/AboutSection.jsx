import React from 'react';
import { Target, Globe2, Cpu, Zap, Award, Users } from 'lucide-react';
import { TechfestLogo } from '../ui/TechfestLogo';

export function AboutSection() {
  const highlights = [
    {
      icon: Users,
      value: '175,000+',
      label: 'Global Attendees',
      subtext: 'Students, researchers, and engineers from over 2,500 institutes.',
    },
    {
      icon: Globe2,
      value: '60+ Nations',
      label: 'International Footprint',
      subtext: 'Delegations competing across robotics, aerospace, and computing.',
    },
    {
      icon: Award,
      value: '₹50,00,000+',
      label: 'Prize & Incubation',
      subtext: 'Direct research grants, hardware kits, and venture acceleration.',
    },
    {
      icon: Cpu,
      value: '100% Interactive',
      label: 'Next-Gen Experience',
      subtext: 'Full 3D WebGL immersion with real-time hardware telemetry.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '120px 24px',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#00F0FF',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '14px',
            background: 'rgba(0, 240, 255, 0.08)',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
          }}
        >
          <Target size={14} />
          CONCLAVE VISION // GENESIS & IMPACT
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '20px',
          }}
        >
          PIONEERING ASIA’S TECHNOLOGICAL VANGUARD
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.6vw, 1.18rem)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          Established at IIT Bombay, Techfest has grown into the undisputed benchmark for student science and engineering excellence. From high-voltage combat robotics to neuromorphic AI and interplanetary exploration, Techfest unites the world’s sharpest minds to shape humanity’s tomorrow.
        </p>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}
      >
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="glass-panel cyber-corner"
              style={{
                padding: '32px 24px',
                background: 'rgba(4, 10, 16, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} color="#00F0FF" />
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: '#FB3640',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)',
                }}
              >
                {item.subtext}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legacy & Vision Banner */}
      <div
        className="glass-panel glass-panel-imperial"
        style={{
          padding: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          borderLeft: '4px solid #FB3640',
          background: 'rgba(0, 15, 8, 0.88)',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <TechfestLogo size={36} showText={true} />
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginTop: '16px',
              marginBottom: '10px',
            }}
          >
            A LEGACY OF RADICAL INGENUITY
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            Every edition pushes technological barriers through real-world problem statements, bilateral international competitions, and hands-on exposure to cutting-edge research. Join the 2026 conclave and witness the frontier unfold.
          </p>
        </div>

        <a
          href="#register"
          className="btn-cyber btn-cyber-primary"
          style={{ padding: '14px 28px', fontSize: '0.88rem', textDecoration: 'none' }}
        >
          <span>JOIN THE 2026 CONCLAVE</span>
        </a>
      </div>
    </section>
  );
}
