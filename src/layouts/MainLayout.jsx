// src/layouts/MainLayout.jsx
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppFloat from '../components/common/WhatsAppFloat';

export default function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Page transition and top progress bar simulation on route change
  useEffect(() => {
    // Reset and start progress
    setProgress(15);
    const t1 = setTimeout(() => setProgress(45), 60);
    const t2 = setTimeout(() => setProgress(75), 150);
    const t3 = setTimeout(() => setProgress(90), 300);
    const t4 = setTimeout(() => setProgress(100), 500);

    const el = mainRef.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      var raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#0F0F10' }}>
      {/* Top progress bar (YouTube style) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #D4AF37, #F2CA50, #D4AF37)',
        boxShadow: '0 0 8px rgba(212, 175, 55, 0.6), 0 0 4px rgba(212, 175, 55, 0.4)',
        zIndex: 9999,
        opacity: progress === 0 || progress === 100 ? 0 : 1,
        transition: progress === 100 
          ? 'width 0.2s ease-out, opacity 0.4s ease-in 0.2s' 
          : 'width 0.35s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.15s ease',
      }} />

      <Navbar />
      <main ref={mainRef} style={{ flex:1, paddingTop:'80px' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
