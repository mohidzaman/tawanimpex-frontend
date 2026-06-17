// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../utils/constants';

export default function NotFound() {
  return (
    <section style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0F0F10' }}>
      <div style={{ textAlign:'center', padding:'40px 24px' }}>
        <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(80px,15vw,160px)', lineHeight:1, color:'rgba(212,175,55,0.15)', letterSpacing:'-0.05em', marginBottom:8, userSelect:'none' }}>404</div>
        <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(22px,4vw,40px)', color:'#EAE1D4', margin:'0 0 16px 0', letterSpacing:'-0.01em' }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,2vw,17px)', color:'#A1A1A1', maxWidth:400, margin:'0 auto 40px', lineHeight:1.7 }}>
          The page you're looking for doesn't exist. Return home or contact us directly.
        </p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/" className="btn-primary" style={{ padding:'14px 32px' }}>RETURN HOME</Link>
          <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding:'14px 32px' }}>CONTACT US</a>
        </div>
      </div>
    </section>
  );
}
