// src/pages/Home.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Award, Zap, Package } from 'lucide-react';
import { STATS, PRODUCT_CATEGORIES, MANUFACTURING_STEPS, WHY_CHOOSE, WHATSAPP_URL, EXPORT_REGIONS } from '../utils/constants';
import { useStaggerReveal } from '../hooks/useScrollReveal';
import { useCounter } from '../hooks/useCounter';

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0F0F10">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

function HeroSection() {
  const ref = useStaggerReveal();

  return (
    <section style={{ position:'relative', minHeight:'calc(100vh - 80px)', display:'flex', alignItems:'center', overflow:'hidden', background:'#0F0F10', paddingBlock:'64px' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(212,175,55,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(215,38,56,0.03) 0%, transparent 50%)' }} />
      <div className="container-main" ref={ref} style={{ position:'relative', zIndex:2 }}>
        <div className="hero-grid" style={{ display:'grid', alignItems:'center' }}>
          {/* Text Content */}
          <div className="hero-content-col" style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div className="reveal" style={{ marginBottom:20 }}>
              <span className="badge badge-gold">OEM • ODM • PRIVATE LABEL SOLUTIONS</span>
            </div>
            <div className="reveal delay-100">
              <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(36px, 5vw, 64px)', lineHeight:1.1, letterSpacing:'-0.02em', color:'#EAE1D4', margin:'0 0 8px 0' }}>
                Precision Sportswear
              </h1>
              <h1 className="text-gold-shimmer" style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(36px, 5vw, 64px)', lineHeight:1.1, letterSpacing:'-0.02em', margin:'0 0 24px 0' }}>
                Manufacturing
              </h1>
            </div>
            <div className="reveal delay-200">
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(15px,1.8vw,18px)', color:'#A1A1A1', lineHeight:1.7, maxWidth:580, marginBottom:40 }}>
                Specialized OEM & ODM manufacturing lines for high-performance athletic apparel, engineered for professional athletes and global retail brands. Based in Sialkot, Pakistan.
              </p>
            </div>
            <div className="reveal delay-300" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 32px' }}>
                <WhatsAppIcon size={18} /> GET A QUOTE
              </a>
              <Link to="/products" className="btn-secondary" style={{ padding:'16px 32px' }}>
                VIEW PRODUCTS <ArrowRight size={16} />
              </Link>
            </div>
            <div className="reveal delay-400" style={{ marginTop:48, display:'flex', gap:28, flexWrap:'wrap' }}>
              {[['20+','Global Clients'],['50K+','Units/Month'],['10+','Countries'],['4','Years Exp.']].map(([v,l]) => (
                <div key={l} style={{ minWidth:100 }}>
                  <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:24, color:'#D4AF37', letterSpacing:'-0.02em' }}>{v}</div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:10, color:'#A1A1A1', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Image Column */}
          <div className="hero-image-col reveal delay-200" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
            <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
            <div className="hero-img-wrapper" style={{ position:'relative', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)', padding:8, background:'rgba(27,27,29,0.5)', backdropFilter:'blur(10px)', width:'100%', maxWidth:540, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
              <img
                src="/images/home_hero.png"
                alt="Tawan Impex Sportswear Factory"
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
  );
}

function TrustBar() {
  const items = [
    { icon: <Globe size={20} />, label:'Worldwide Shipping', sub:'Global export reach' },
    { icon: <Award size={20} />, label:'OEM Manufacturing',  sub:'Full custom capacity' },
    { icon: <Package size={20}/>, label:'Premium Quality',   sub:'ISO certified precision' },
    { icon: <Zap size={20} />,   label:'Fast Production',    sub:'Optimized lead times' },
  ];
  return (
    <section style={{ background:'#1B1B1D', borderTop:'1px solid #2A2A2D', borderBottom:'1px solid #2A2A2D' }}>
      <div className="container-main" style={{ paddingBlock:36 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 180px),1fr))', gap:24 }}>
          {items.map((it,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:10, background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', flexShrink:0 }}>{it.icon}</div>
              <div>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:13, color:'#EAE1D4' }}>{it.label}</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', marginTop:2 }}>{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCategories() {
  const ref = useStaggerReveal();
  return (
    <section className="section-gap" style={{ background:'#0F0F10' }}>
      <div className="container-main" ref={ref}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <span className="section-label">Our Products</span>
          <span className="gold-divider" style={{ margin:'16px auto' }} />
          <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:'0 auto', maxWidth:600 }}>
            Manufacturing Lines for Every Sport
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 280px),1fr))', gap:24 }}>
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <Link key={cat.id} to={`/products?cat=${cat.id}`} className={`card-dark reveal delay-${(i%4+1)*100}`} style={{ padding:32, textDecoration:'none', display:'block' }}>
              <div style={{ fontSize:36, marginBottom:20 }}>{cat.icon}</div>
              <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'0 0 8px 0' }}>{cat.name}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', margin:'0 0 20px 0' }}>{cat.desc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:6, color:'#D4AF37', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:12, letterSpacing:'0.05em' }}>
                VIEW PRODUCTS <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
        <div className="reveal" style={{ textAlign:'center', marginTop:56 }}>
          <Link to="/products" className="btn-primary" style={{ padding:'16px 40px' }}>BROWSE FULL CATALOG <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}

function ManufacturingProcess() {
  const ref = useStaggerReveal();
  return (
    <section className="section-gap" style={{ background:'#16130B' }}>
      <div className="container-main" ref={ref}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <span className="section-label">How We Work</span>
          <span className="gold-divider" style={{ margin:'16px auto' }} />
          <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0 }}>
            From Concept to Delivery
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px),1fr))', gap:2 }}>
          {MANUFACTURING_STEPS.map((step, i) => (
            <div key={i} className={`reveal delay-${(i%3+1)*100}`} style={{ padding:32, background: i%2===0 ? '#1B1B1D' : '#231F17', borderTop:'1px solid #2A2A2D', borderRight: i%2===0 ? '1px solid #2A2A2D' : 'none' }}>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:64, color:'rgba(212,175,55,0.12)', lineHeight:1, marginBottom:16, letterSpacing:'-0.03em', userSelect:'none' }}>{step.step}</div>
              <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'0 0 12px 0' }}>{step.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:1.7, margin:0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign:'center', marginTop:56 }}>
          <Link to="/manufacturing" className="btn-secondary" style={{ padding:'16px 40px' }}>LEARN MORE <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const ref = useStaggerReveal();
  return (
    <section className="section-gap" style={{ background:'#0F0F10' }}>
      <div className="container-main" ref={ref}>
        <div className="reveal" style={{ marginBottom:64 }}>
          <span className="section-label">Why Tawan Impex</span>
          <span className="gold-divider" />
          <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0, maxWidth:540 }}>Built for Global B2B Buyers</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px),1fr))', gap:24 }}>
          {WHY_CHOOSE.map((item, i) => (
            <div key={i} className={`reveal delay-${(i%3+1)*100}`} style={{ padding:28, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#D4AF37', marginBottom:20 }} />
              <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:'0 0 10px 0' }}>{item.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:1.7, margin:0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlobalReachSection() {
  const ref = useStaggerReveal();
  return (
    <section className="section-gap" style={{ background:'#121214', borderTop:'1px solid #2A2A2D', borderBottom:'1px solid #2A2A2D' }}>
      <div className="container-main" ref={ref}>
        <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
          <span className="section-label">Global Distribution</span>
          <span className="gold-divider" style={{ margin:'16px auto' }} />
          <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:'0 auto', maxWidth:600 }}>
            30+ Countries. One Source.
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(15px,1.5vw,17px)', color:'#A1A1A1', lineHeight:1.7, maxWidth:520, margin:'20px auto 0' }}>
            Tawan Impex exports premium sportswear to over 30 nations across 5 continents, with dedicated logistics partners in each region.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 280px),1fr))', gap:20, marginBottom:56 }}>
          {EXPORT_REGIONS.map((region, i) => (
            <div
              key={region.region}
              className={`reveal delay-${(i % 4 + 1) * 100}`}
              style={{ padding:28, background:'#0F0F10', border:'1px solid #2A2A2D', borderRadius:16, position:'relative', overflow:'hidden' }}
            >
              {/* Progress bar accent */}
              <div style={{ position:'absolute', top:0, left:0, height:2, width:`${region.percentage}%`, background:'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.3))', borderRadius:'0 2px 0 0' }} />
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:0 }}>{region.region}</h3>
                <span style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:22, color:'#D4AF37', letterSpacing:'-0.02em' }}>{region.percentage}%</span>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {region.countries.map(country => (
                  <span key={country} className="badge badge-muted" style={{ fontSize:10, padding:'4px 10px' }}>{country}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign:'center' }}>
          <Link to="/contact" className="btn-secondary" style={{ padding:'16px 40px' }}>REQUEST SHIPPING TERMS <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
  );
}

function StatCounter({ value, suffix, label }) {
  const { count, ref } = useCounter(value, 2500);
  return (
    <div ref={ref} style={{ textAlign:'center', padding:'32px 24px' }}>
      <div className="stat-number">{count}{suffix}</div>
      <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', letterSpacing:'0.06em', textTransform:'uppercase', marginTop:8 }}>{label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section style={{ background:'#16130B', borderTop:'1px solid #2A2A2D', borderBottom:'1px solid #2A2A2D' }}>
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
  );
}

function FinalCTA() {
  return (
    <section className="section-gap" style={{ background:'#0F0F10' }}>
      <div className="container-main">
        <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:20, padding:'80px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:'-50%', left:'50%', transform:'translateX(-50%)', width:'60%', height:'200px', background:'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
          <span className="badge badge-gold" style={{ marginBottom:24, position:'relative' }}>Ready to Partner?</span>
          <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(26px,4vw,52px)', letterSpacing:'-0.02em', color:'#EAE1D4', margin:'16px auto 20px', maxWidth:640, lineHeight:1.15, position:'relative' }}>
            Join 20+ International Brands
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(15px,2vw,18px)', color:'#A1A1A1', maxWidth:480, margin:'0 auto 40px', lineHeight:1.7, position:'relative' }}>
            Trust TAWAN IMPEX for precision manufacturing, unmatched reliability, and export-grade quality.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
            <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 40px' }}>
              <WhatsAppIcon size={18} /> GET A QUOTE
            </a>
            <Link to="/contact" className="btn-secondary" style={{ padding:'16px 40px' }}>CONTACT US</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { document.title = 'Tawan Impex | OEM/ODM Sportswear Manufacturing — Sialkot, Pakistan'; }, []);
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductCategories />
      <ManufacturingProcess />
      <WhyChooseUs />
      <GlobalReachSection />
      <StatsSection />
      <FinalCTA />
    </>
  );
}
