// src/components/common/LoadingScreen.jsx
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 1200; // 1.2s total loading time
    const interval = 20;   // Update every 20ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600); // matches CSS fadeOut duration
          }, 200);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#0F0F10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      visibility: fadeOut ? 'hidden' : 'visible',
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
      willChange: 'opacity',
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        transform: fadeOut ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}>
        {/* Brand logo container */}
        <div style={{
          position: 'relative',
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'premiumPulse 2.5s infinite ease-in-out',
        }}>
          {/* Outer gold pulse ring */}
          <div style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            animation: 'premiumRingPulse 2.5s infinite ease-in-out',
          }} />
          <img 
            src="/images/logo.png" 
            alt="Tawan Impex Logo" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
            }} 
          />
        </div>

        {/* Brand Name */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
          fontSize: 20,
          color: '#EAE1D4',
          letterSpacing: '0.15em',
          margin: 0,
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: 0.9,
        }}>
          Tawan Impex
        </h1>

        {/* Thin progress bar */}
        <div style={{
          width: 180,
          height: 2,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          marginTop: 8,
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #D4AF37, #F2CA50, #D4AF37)',
            transition: 'width 0.1s cubic-bezier(0.1, 0.8, 0.3, 1)',
            boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes premiumPulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes premiumRingPulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.9; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
