// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '../../utils/constants';

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          1000,
          height:          '80px',
          display:         'flex',
          alignItems:      'center',
          background:      scrolled ? 'rgba(15,15,16,0.96)' : 'rgba(15,15,16,0.70)',
          backdropFilter:  'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom:    scrolled ? '1px solid #2A2A2D' : '1px solid transparent',
          transition:      'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="container-main" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
            <img 
              src="/images/logo.png" 
              alt="Tawan Impex Logo" 
              style={{ height: 40, width: 'auto', flexShrink: 0 }} 
            />
            <div>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:16, color:'#EAE1D4', lineHeight:1, letterSpacing:'-0.01em' }}>
                TAWAN IMPEX
              </div>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:400, fontSize:10, color:'#A1A1A1', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:2 }}>
                Sialkot, Pakistan
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ alignItems:'center', gap:36 }} className="hidden md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={WHATSAPP_URL()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon size={16} />
              GET A QUOTE
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background:'none', border:'none', color:'#EAE1D4', cursor:'pointer', padding:8 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     999,
          background: 'rgba(15,15,16,0.98)',
          backdropFilter: 'blur(20px)',
          display:    'flex',
          flexDirection: 'column',
          paddingTop: '80px',
          transform:  menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <nav style={{ padding:'40px 24px', display:'flex', flexDirection:'column', gap:8 }}>
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontFamily:      'Montserrat,sans-serif',
                fontWeight:      600,
                fontSize:        24,
                color:           isActive ? '#D4AF37' : '#EAE1D4',
                padding:         '16px 0',
                borderBottom:    '1px solid #2A2A2D',
                transition:      'color 0.2s ease',
                animationDelay:  `${i * 60}ms`,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding:'0 24px', marginTop:'auto', marginBottom:32 }}>
          <a
            href={WHATSAPP_URL()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width:'100%', justifyContent:'center' }}
          >
            <WhatsAppIcon size={18} />
            GET A QUOTE ON WHATSAPP
          </a>
        </div>
      </div>
    </>
  );
}

// Inline WhatsApp SVG icon
function WhatsAppIcon({ size = 20, color = '#0F0F10' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z" />
    </svg>
  );
}
