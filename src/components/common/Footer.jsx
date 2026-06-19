// src/components/common/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { SITE, NAV_LINKS, WHATSAPP_URL } from '../../utils/constants';

const FOOTER_PRODUCTS = [
  { label: 'Soccer Kits',           path: '/products?cat=soccer'      },
  { label: 'Basketball Uniforms',   path: '/products?cat=basketball'  },
  { label: 'Tracksuits',            path: '/products?cat=tracksuits'  },
  { label: 'Fitness Apparel',       path: '/products?cat=fitness'     },
  { label: 'Custom ODM',            path: '/products?cat=custom'      },
];

const FOOTER_COMPANY = [
  { label: 'Our Story',   path: '/about'         },
  { label: 'Manufacturing', path: '/manufacturing' },
  { label: 'Quality Control', path: '/manufacturing#quality' },
  { label: 'Contact Us',  path: '/contact'        },
];

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: '#16130B', borderTop: '1px solid #2A2A2D' }}>
      {/* Main Footer Grid */}
      <div className="container-main" style={{ paddingBlock: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px 32px',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <img 
                src="/images/logo.png" 
                alt="Tawan Impex Logo" 
                style={{ height: 40, width: 'auto' }} 
              />
              <span style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:15, color:'#EAE1D4' }}>TAWAN IMPEX</span>
            </Link>

            <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:'1.7', marginBottom:24, maxWidth:260 }}>
              Industrial precision sportswear manufacturing for the world's most demanding brands.
            </p>

            {/* Social Icons */}
            <div style={{ display:'flex', gap:12 }}>
              {[
                { href: SITE.instagram, icon: <InstagramIcon size={18} />, label: 'Instagram' },
                { href: SITE.facebook,  icon: <FacebookIcon  size={18} />, label: 'Facebook'  },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width:40, height:40, borderRadius:8,
                    border:'1px solid #2A2A2D',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'#A1A1A1',
                    transition:'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='#D4AF37'; e.currentTarget.style.color='#D4AF37'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#2A2A2D'; e.currentTarget.style.color='#A1A1A1'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
              {FOOTER_COMPANY.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', transition:'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A1A1A1')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <FooterHeading>Products</FooterHeading>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
              {FOOTER_PRODUCTS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', transition:'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#A1A1A1')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <ContactItem icon={<MapPin size={14} />}>
                {SITE.address}
              </ContactItem>
              <ContactItem icon={<Mail size={14} />}>
                <a href={`mailto:${SITE.email}`} style={{ color:'inherit' }}>{SITE.email}</a>
              </ContactItem>
              <ContactItem icon={<Phone size={14} />}>
                <a href={`tel:${SITE.phone.replace(/\s/g,'')}`} style={{ color:'inherit' }}>{SITE.phone}</a>
              </ContactItem>
              <ContactItem icon={<WhatsAppIconSmallGold />}>
                <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" style={{ color:'inherit' }}>+92 337 6123116</a>
              </ContactItem>
            </div>

            <a
              href={WHATSAPP_URL()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop:24, fontSize:12 }}
            >
              <WhatsAppIconSmall />
              WHATSAPP US
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #2A2A2D' }}>
        <div className="container-main" style={{ paddingBlock:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase', margin:0 }}>
            © {new Date().getFullYear()} TAWAN IMPEX. BUILT BY SERVSA.
          </p>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, color:'#4D4635', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', margin:0 }}>
            INDUSTRIAL PRECISION SPORTSWEAR • SIALKOT, PAKISTAN
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <h3 style={{
      fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:12,
      letterSpacing:'0.12em', textTransform:'uppercase', color:'#D4AF37',
      marginBottom:20, marginTop:0,
    }}>
      {children}
    </h3>
  );
}

function ContactItem({ icon, children }) {
  return (
    <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
      <span style={{ color:'#D4AF37', flexShrink:0, marginTop:2 }}>{icon}</span>
      <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:'1.5' }}>{children}</span>
    </div>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="#0F0F10">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

function WhatsAppIconSmallGold() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}
