// src/pages/About.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { STATS, WHATSAPP_URL } from '../utils/constants';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import { useCounter } from '../hooks/useCounter';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

function StatCounter({ value, suffix, label }) {
  const { count, ref } = useCounter(value, 2500);
  return (
    <div ref={ref} style={{ textAlign:'center', padding:'40px 24px' }}>
      <div className="stat-number">{count}{suffix}</div>
      <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:8 }}>{label}</div>
    </div>
  );
}

const TIMELINE = [
  { year:'2023', title:'Founded in Sialkot', desc:'Tawan Impex was established with a vision to bring premium sportswear manufacturing to the global stage from Pakistan\'s sportswear capital.' },
  { year:'2024', title:'First International Export', desc:'Secured first export contracts to Europe and the Middle East, establishing our reputation for quality and reliability.' },
  { year:'2025', title:'Production Scale-Up', desc:'Expanded production capacity with modern cutting and sewing lines, reaching 50K units/month across all categories.' },
  { year:'2026', title:'10+ Export Countries', desc:'Now exporting to over 10 countries across Europe, Americas, Middle East, and Asia Pacific.' },
];

export default function About() {
  useEffect(() => { document.title = 'About Tawan Impex | Industrial Luxury Sportswear Manufacturing'; }, []);
  const heroRef = useStaggerReveal();
  const ref1 = useStaggerReveal();
  const ref2 = useStaggerReveal();
  const ref3 = useStaggerReveal();

  return (
    <>
      {/* Hero */}
      <section style={{ position:'relative', overflow:'hidden', background:'#0F0F10', paddingBlock:'80px 64px', borderBottom:'1px solid #2A2A2D' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />
        <div className="container-main" ref={heroRef} style={{ position:'relative', zIndex:2 }}>
          <div className="hero-grid" style={{ display:'grid', alignItems:'center' }}>
            {/* Text Content */}
            <div className="hero-content-col" style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <div className="reveal">
                <span className="section-label">About Tawan Impex</span>
                <span className="gold-divider" style={{ margin:'12px 0 20px 0' }} />
              </div>
              <div className="reveal delay-100">
                <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(28px,5vw,56px)', lineHeight:1.15, letterSpacing:'-0.02em', color:'#EAE1D4', margin:'0 0 20px 0' }}>
                  4 Years of Industrial Precision Sportswear
                </h1>
              </div>
              <div className="reveal delay-200">
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(15px,2vw,18px)', color:'#A1A1A1', maxWidth:580, lineHeight:1.7, margin:'0 0 40px 0' }}>
                  From a single factory floor in Sialkot to a globally trusted OEM/ODM partner for brands across 30+ countries. We engineer performance garments with luxury standards.
                </p>
              </div>
              <div className="reveal delay-300" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 32px' }}>
                  <WhatsAppIcon size={16}/> GET A QUOTE
                </a>
              </div>
            </div>
            {/* Image Column */}
            <div className="hero-image-col reveal delay-200" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
              <div className="hero-img-wrapper" style={{ position:'relative', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)', padding:8, background:'rgba(27,27,29,0.5)', backdropFilter:'blur(10px)', width:'100%', maxWidth:540, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/about_hero.png"
                  alt="Tawan Impex Factory Team"
                  loading="eager"
                  fetchPriority="high"
                  style={{ width:'100%', height:'auto', borderRadius:14, display:'block', objectFit:'cover' }}
                />
                <div style={{ position:'absolute', inset:8, borderRadius:14, background:'linear-gradient(180deg, transparent 60%, rgba(15,15,16,0.6) 100%)', pointerEvents:'none' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-gap" style={{ background:'#0F0F10' }}>
        <div className="container-main" ref={ref1}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px),1fr))', gap:24 }}>
            <div className="card-dark reveal" style={{ padding:40, borderLeft:'3px solid #D4AF37' }}>
              <span className="section-label" style={{ marginBottom:16, display:'block' }}>Our Mission</span>
              <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:'0 0 16px 0' }}>
                Manufacture for the World's Best Brands
              </h2>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.8, margin:0 }}>
                To deliver industrial-precision sportswear that meets the highest standards of global retail, enabling international brands to scale their product lines with confidence, quality, and speed from Sialkot, Pakistan.
              </p>
            </div>
            <div className="card-dark reveal delay-200" style={{ padding:40, borderLeft:'3px solid #D72638' }}>
              <span className="section-label" style={{ marginBottom:16, display:'block', color:'#D72638' }}>Our Vision</span>
              <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:'0 0 16px 0' }}>
                Pakistan's Premier Sportswear Exporter
              </h2>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.8, margin:0 }}>
                To become the most trusted OEM/ODM sportswear manufacturer in South Asia — known globally for uncompromising quality, ethical production practices, and the ability to manufacture any garment concept at any scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Timeline */}
      <section className="section-gap" style={{ background:'#16130B' }}>
        <div className="container-main" ref={ref2}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
            <span className="section-label">Our Journey</span>
            <span className="gold-divider" style={{ margin:'16px auto' }} />
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0 }}>
              Company History
            </h2>
          </div>
          <div style={{ position:'relative' }}>
            {/* Timeline line */}
            <div style={{ position:'absolute', left:'calc(80px + 1px)', top:0, bottom:0, width:'2px', background:'linear-gradient(180deg, #D4AF37, rgba(212,175,55,0.1))', display:'none' }} className="md:block" />
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {TIMELINE.map((item, i) => (
                <div key={i} className={`reveal delay-${(i%3+1)*100}`} style={{ display:'flex', gap:32, padding:'32px 0', borderBottom: i < TIMELINE.length-1 ? '1px solid #2A2A2D' : 'none', alignItems:'flex-start' }}>
                  <div style={{ minWidth:80, flexShrink:0, textAlign:'right' }}>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:18, color:'#D4AF37', letterSpacing:'-0.01em' }}>{item.year}</div>
                  </div>
                  <div style={{ width:12, height:12, borderRadius:'50%', background:'#D4AF37', border:'3px solid #16130B', flexShrink:0, marginTop:4, position:'relative', zIndex:1 }} />
                  <div style={{ flex:1 }}>
                    <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'0 0 8px 0' }}>{item.title}</h3>
                    <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:1.7, margin:0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'#0F0F10', borderTop:'1px solid #2A2A2D', borderBottom:'1px solid #2A2A2D' }}>
        <div className="container-main">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 180px),1fr))', gap:0 }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ borderRight: i < STATS.length-1 ? '1px solid #2A2A2D' : 'none' }}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Overview */}
      <section className="section-gap" style={{ background:'#16130B' }}>
        <div className="container-main" ref={ref3}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 320px),1fr))', gap:48, alignItems:'center' }}>
            <div>
              <div className="reveal">
                <span className="section-label">Factory Overview</span>
                <span className="gold-divider" />
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(24px,4vw,42px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:'0 0 20px 0' }}>
                  Built for Industrial Scale
                </h2>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.8, marginBottom:32 }}>
                  Our 8,000 sq ft facility in Sialkot's Industrial Zone houses 23+ skilled workers across specialized production lines. Every workstation is purpose-built for sportswear manufacturing with precision and repeatability.
                </p>
              </div>
              <div className="reveal delay-200" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[['8,000 sq ft','Factory Floor'],['23+','Skilled Workers'],['40+','Machines'],['4','Years Experience']].map(([v,l]) => (
                  <div key={l} style={{ padding:20, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:10 }}>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:22, color:'#D4AF37', letterSpacing:'-0.02em', marginBottom:4 }}>{v}</div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', letterSpacing:'0.06em', textTransform:'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Factory image */}
            <div className="reveal reveal-right" style={{ position:'relative', height:400, border:'1px solid #2A2A2D', borderRadius:16, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.4)' }}>
              <img
                src="/images/home_hero.png"
                alt="Sialkot Production Floor"
                loading="lazy"
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
              />
              <div style={{ position:'absolute', inset:0, background: 'linear-gradient(to top, rgba(15,15,16,0.9) 0%, rgba(15,15,16,0.2) 60%)' }} />
              <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:14, fontWeight:700, color:'#D4AF37', letterSpacing:'0.05em' }}>Sialkot Factory Floor</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', marginTop:4 }}>8,000 sq ft modern production facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-gap" style={{ background:'#0F0F10' }}>
        <div className="container-main">
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:20, padding:'72px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:'-40%', left:'50%', transform:'translateX(-50%)', width:'50%', height:'180px', background:'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
            <span className="badge badge-gold" style={{ marginBottom:20, position:'relative' }}>Partner With Us</span>
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(24px,4vw,48px)', color:'#EAE1D4', margin:'16px auto 20px', maxWidth:560, lineHeight:1.2, position:'relative' }}>
              Ready to Build Something Great?
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,2vw,17px)', color:'#A1A1A1', maxWidth:440, margin:'0 auto 36px', lineHeight:1.7, position:'relative' }}>
              Over 50 global brands trust Tawan Impex. Join them.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
              <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 36px' }}>
                <WhatsAppIcon size={16}/> GET A QUOTE
              </a>
              <Link to="/contact" className="btn-secondary" style={{ padding:'16px 36px' }}>CONTACT US <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
