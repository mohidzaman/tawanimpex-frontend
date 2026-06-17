// src/components/common/PageLoader.jsx
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Avoid layout flash on extremely fast loads
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99998,
      background: '#0F0F10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      animation: 'fadeInLoader 0.3s ease-out forwards',
    }}>
      {/* Center brand logo with subtle scale pulse */}
      <div style={{
        position: 'relative',
        width: 60,
        height: 60,
        animation: 'pulseScale 2s infinite ease-in-out',
      }}>
        <img 
          src="/images/logo.png" 
          alt="Loading..." 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>

      {/* Thin progress bar */}
      <div style={{
        width: 120,
        height: 2,
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #D4AF37, #F2CA50, #D4AF37)',
          animation: 'progressMove 1.5s infinite ease-in-out',
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.4)',
        }} />
      </div>

      <style>{`
        @keyframes fadeInLoader {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseScale {
          0%, 100% { transform: scale(0.96); opacity: 0.8; }
          50% { transform: scale(1.04); opacity: 1; }
        }
        @keyframes progressMove {
          0% { left: -100%; width: 100%; }
          50% { left: 0%; width: 40%; }
          100% { left: 100%; width: 100%; }
        }
      `}</style>
    </div>
  );
}
