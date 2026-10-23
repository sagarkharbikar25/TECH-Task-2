import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../../lib/audio';

export function BentoCard({
  title,
  category,
  description,
  metric,
  badge,
  accentColor = '#00F0FF',
  style = {},
  onSelect,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleClick = () => {
    sound.playHotspotClick();
    if (onSelect) onSelect();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: '28px',
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'rgba(8, 12, 16, 0.82)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      className="bento-card-hover"
    >
      {/* 1. Dynamic Cursor Spotlight (Border Highlight) */}
      <div
        className="bento-spotlight"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Interior Glass Surface Layer */}
      <div
        style={{
          position: 'absolute',
          inset: '1px',
          borderRadius: '15px',
          background: 'rgba(5, 10, 14, 0.92)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Card Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              color: '#94A3B8',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
          {badge && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '2px 8px',
                borderRadius: '12px',
                border: `1px solid ${accentColor}40`,
                background: `${accentColor}15`,
                color: '#FFFFFF',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            marginBottom: '10px',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
          }}
        >
          {description}
        </p>
      </div>

      {/* Card Footer */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: accentColor,
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {metric}
        </div>

        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}
