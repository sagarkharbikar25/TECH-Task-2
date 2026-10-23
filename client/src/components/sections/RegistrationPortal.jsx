import React, { useState } from 'react';
import { X, CheckCircle, Ticket, User, Mail, School, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../lib/audio';

export function RegistrationPortal({ isOpen, onClose, defaultTrack = 'all' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    track: defaultTrack === 'all' ? 'Robowars' : defaultTrack,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playHotspotClick();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FB3640', '#FFFFFF', '#9D4EDD'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleClose = () => {
    sound.playReset();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 15, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={handleClose}
    >
      <div
        className="glass-panel glass-panel-imperial cyber-corner"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '36px',
          borderLeft: '4px solid #00F0FF',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#00F0FF',
                letterSpacing: '0.15em',
                marginBottom: '4px',
              }}
            >
              TECHFEST 2026 // OFFICIAL REGISTRATION PORTAL
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              {isSubmitted ? 'PASS AUTHORIZED' : 'SECURE REGISTRATION'}
            </h2>
          </div>

          <button onClick={handleClose} className="btn-cyber" style={{ padding: '8px', borderRadius: '50%' }}>
            <X size={16} color="#94A3B8" />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid #00F0FF',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle size={32} color="#00F0FF" />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              WELCOME TO THE MATRIX, {formData.name.toUpperCase()}
            </h3>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Your digital festival pass token <span style={{ color: '#00F0FF', fontFamily: 'var(--font-mono)' }}>#TF26-{Math.floor(100000 + Math.random() * 900000)}</span> has been registered for <span style={{ color: '#FB3640' }}>{formData.track}</span>.
            </p>

            <button onClick={handleClose} className="btn-cyber btn-cyber-primary" style={{ width: '100%', justifyContent: 'center' }}>
              RETURN TO SHOWCASE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94A3B8', marginBottom: '6px' }}>
                FULL NAME
              </label>
              <input
                required
                type="text"
                placeholder="Agent Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94A3B8', marginBottom: '6px' }}>
                ACADEMIC EMAIL
              </label>
              <input
                required
                type="email"
                placeholder="name@institute.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94A3B8', marginBottom: '6px' }}>
                COLLEGE / UNIVERSITY
              </label>
              <input
                required
                type="text"
                placeholder="e.g. IIT Bombay / NIT"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#94A3B8', marginBottom: '6px' }}>
                PRIMARY TRACK
              </label>
              <select
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#080C10',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              >
                <option value="Robowars">ROBOWARS // COMBAT ARENA</option>
                <option value="Neural Hackathon">NEURAL MATRIX 48H HACKATHON</option>
                <option value="Drone Racing">NEON DRONE GRAND PRIX</option>
                <option value="Workshops">ROBOTICS & EMBODIED AI WORKSHOPS</option>
                <option value="General Pass">GENERAL CONCLAVE VISITOR PASS</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-cyber btn-cyber-primary"
              style={{
                marginTop: '10px',
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.88rem',
              }}
            >
              <Ticket size={16} />
              <span>ISSUE FESTIVAL PASS</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
