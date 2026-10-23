import React from 'react';
import { BentoCard } from '../ui/BentoCard';
import { Layers } from 'lucide-react';

export function BentoGrid({ onSelectCard }) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '120px 24px',
      }}
    >
      <div style={{ marginBottom: '48px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#00F0FF',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <Layers size={14} />
          CATEGORIES & CONCLAVES //
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}
        >
          THE ASYMMETRICAL EVENT MATRIX
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Card 1: Robowars Combat Arena */}
        <BentoCard
          title="ROBOWARS // STEEL CRUCIBLE"
          category="FLAGSHIP COMPETITION"
          description="High-voltage 60kg pneumatic combat robots battling in an armored steel-mesh cage for the national championship."
          metric="PRIZE: ₹5,00,000"
          badge="TIER 1 COMBAT"
          accentColor="#FB3640"
          onSelect={() => onSelectCard?.('robowars')}
        />

        {/* Card 2: Neural Hackathon */}
        <BentoCard
          title="NEURAL MATRIX 48H"
          category="HACKATHON"
          description="Build decentralized autonomous agent networks, quantum cryptographic algorithms, and neural cybernetic interfaces."
          metric="2,400+ APPLICANTS"
          badge="CLOSING SOON"
          accentColor="#00F0FF"
          onSelect={() => onSelectCard?.('hackathon')}
        />

        {/* Card 3: Quantum & AI Workshops */}
        <BentoCard
          title="GENERATIVE AI & EMBODIED ROBOTICS"
          category="MASTERCLASS WORKSHOP"
          description="Hands-on masterclass led by researchers from premier labs on reinforcement learning for quadrupeds and humanoid limbs."
          metric="CERTIFIED HANDS-ON"
          badge="300 SEATS"
          accentColor="#9D4EDD"
          onSelect={() => onSelectCard?.('workshop')}
        />

        {/* Card 4: Night Drone Racing */}
        <BentoCard
          title="NEON DRONE PYLON GRAND PRIX"
          category="AEROSPACE RACING"
          description="FPV drone acrobatics through illuminated neon obstacle pylons at speeds exceeding 140 km/h with zero-latency video telemetry."
          metric="TOP SPEED: 160 KM/H"
          badge="INTERNATIONAL"
          accentColor="#00F0FF"
          onSelect={() => onSelectCard?.('drone')}
        />

        {/* Card 5: Cybernetic Prosthetics Expo */}
        <BentoCard
          title="BIONIC & EXOSUIT EXPOSITION"
          category="TECH EXHIBITION"
          description="Live demonstration of carbon-titanium motorized exoskeletons, neural prosthetic arms, and assistive gait augmentations."
          metric="FLAGSHIP 3D EXPO"
          badge="LIVE DEMO"
          accentColor="#FB3640"
          onSelect={() => onSelectCard?.('cyborg')}
        />

        {/* Card 6: Keynote Leadership Conclave */}
        <BentoCard
          title="GLOBAL TECHFEST KEYNOTES"
          category="SUMMIT STAGE"
          description="Inspiring keynotes from visionary founders, deep-tech pioneers, and aerospace directors pushing boundaries beyond earth."
          metric="14 VISIONARIES"
          badge="KEYNOTE"
          accentColor="#FFD700"
          onSelect={() => onSelectCard?.('conclave')}
        />
      </div>
    </section>
  );
}
