// src/components/common/WhatsAppFloat.jsx
import { Phone } from 'lucide-react';
import { SITE, WHATSAPP_URL } from '../../utils/constants';

/**
 * Floating WhatsApp button (desktop) + Mobile sticky bottom bar
 */
export default function WhatsAppFloat() {
  return (
    <>
      {/* Desktop Floating Button */}
      <a
        href={WHATSAPP_URL()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppSVG size={30} color="#fff" />
      </a>

      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-sticky-bar">
        <a
          href={WHATSAPP_URL()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            padding:'8px 4px',
            background:'#25D366', borderRadius:10, color:'#fff', textDecoration:'none',
          }}
        >
          <WhatsAppSVG size={20} color="#fff" />
          <span style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:10, letterSpacing:'0.05em' }}>WHATSAPP</span>
        </a>

        <a
          href={`tel:${SITE.phone.replace(/\s/g,'')}`}
          style={{
            flex: 1, display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            padding:'8px 4px',
            background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:10, color:'#EAE1D4', textDecoration:'none',
          }}
        >
          <Phone size={20} />
          <span style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:10, letterSpacing:'0.05em' }}>CALL</span>
        </a>

        <a
          href={WHATSAPP_URL('I would like to request a quote for sportswear manufacturing.')}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4,
            padding:'8px 12px',
            background:'#D4AF37', borderRadius:10, color:'#0F0F10', textDecoration:'none',
          }}
        >
          <span style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:11, letterSpacing:'0.05em', textAlign:'center' }}>GET QUOTE</span>
        </a>
      </div>
    </>
  );
}

function WhatsAppSVG({ size = 24, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z" />
    </svg>
  );
}
