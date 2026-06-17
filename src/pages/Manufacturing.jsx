// src/pages/Manufacturing.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { MANUFACTURING_STEPS, WHATSAPP_URL } from '../utils/constants';
import { useStaggerReveal } from '../hooks/useScrollReveal';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

const OEM_FEATURES = [
  'Your brand labels, hang tags & custom packaging',
  'Complete fabric & material flexibility',
  'Size grading to your exact specifications',
  'Colorway customization with Pantone matching',
  'Embroidery, heat transfer, and sublimation printing',
  'Sample approval before bulk production',
];

const ODM_FEATURES = [
  'In-house design team for concept development',
  'Trend-driven pattern & print creation',
  'Full tech pack development',
  'Prototype to final product service',
  'IP protection and NDA agreements',
  'White-label options available',
];

const QC_STEPS = [
  { title:'Fabric Inspection',     desc:'All incoming fabrics are tested for GSM, shrinkage, colorfastness, and tensile strength.' },
  { title:'In-Line QC',            desc:'Continuous quality checks during cutting and sewing to catch issues at source.' },
  { title:'End-Line Inspection',   desc:'Every completed garment inspected against approved samples before packing.' },
  { title:'AQL Sampling',          desc:'Statistical sampling using AQL 2.5 international standard for final batch approval.' },
  { title:'Export Documentation',  desc:'Full compliance documentation: inspection reports, packing lists, certificates of origin.' },
];

const EQUIPMENT = [
  { name:'High-Speed Sewing Machines',   count:'40+',  desc:'Juki & Brother industrial units' },
  { name:'Sublimation Printing Lines',   count:'2',    desc:'Full-width roll-to-roll printers' },
  { name:'Heat Press Stations',          count:'6',    desc:'Pneumatic heat transfer stations' },
  { name:'Embroidery Machines',          count:'4',    desc:'Multi-head Barudan units' },
  { name:'Cutting Machines',             count:'3',    desc:'Auto-cutters & band knives' },
  { name:'QC Inspection Tables',         count:'5',    desc:'Lightbox AQL inspection setups' },
];

const SHIPPING_OPTIONS = [
  { term:'FOB Sialkot', desc:'Goods delivered to Sialkot port. You arrange onward freight.' },
  { term:'CIF',         desc:'We cover cost, insurance & freight to destination port.' },
  { term:'DDP',         desc:'Full door-to-door delivery with all duties paid.' },
  { term:'Express',     desc:'DHL/FedEx air freight for samples and urgent orders.' },
];

export default function Manufacturing() {
  useEffect(() => { document.title = 'Manufacturing | Tawan Impex — OEM & ODM Sportswear'; }, []);
  const heroRef = useStaggerReveal();
  const ref1 = useStaggerReveal();
  const ref2 = useStaggerReveal();
  const ref3 = useStaggerReveal();
  const ref4 = useStaggerReveal();

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
                <span className="section-label">Manufacturing Excellence</span>
                <span className="gold-divider" style={{ margin:'12px 0 20px 0' }} />
              </div>
              <div className="reveal delay-100">
                <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(28px,5vw,60px)', lineHeight:1.1, letterSpacing:'-0.02em', color:'#EAE1D4', margin:'0 0 20px 0' }}>
                  Industrial-Scale OEM & ODM Manufacturing
                </h1>
              </div>
              <div className="reveal delay-200">
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(15px,2vw,18px)', color:'#A1A1A1', maxWidth:580, lineHeight:1.7, margin:'0 0 40px 0' }}>
                  Modern factory in Sialkot producing 50,000+ units per month with precision quality control and global export capability. We utilize premium automated machinery.
                </p>
              </div>
              <div className="reveal delay-300" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 32px' }}>
                  <WhatsAppIcon size={16}/> GET A QUOTE
                </a>
                <Link to="/contact" className="btn-secondary" style={{ padding:'16px 32px' }}>
                  SEND INQUIRY <ArrowRight size={16}/>
                </Link>
              </div>
            </div>
            {/* Image Column */}
            <div className="hero-image-col reveal delay-200" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
              <div className="hero-img-wrapper" style={{ position:'relative', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)', padding:8, background:'rgba(27,27,29,0.5)', backdropFilter:'blur(10px)', width:'100%', maxWidth:540, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/manufacturing_hero.png"
                  alt="Tawan Impex Precision Embroidery Machine"
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

      {/* OEM + ODM Services */}
      <section className="section-gap" style={{ background:'#0F0F10' }} ref={ref1}>
        <div className="container-main">
          <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
            <span className="section-label">Services</span>
            <span className="gold-divider" style={{ margin:'16px auto' }} />
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0 }}>
              OEM & ODM Capabilities
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 320px),1fr))', gap:24 }}>
            {/* OEM Card */}
            <div className="card-dark reveal" style={{ padding:40 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                <div style={{ width:48, height:48, borderRadius:10, background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:14, color:'#D4AF37', letterSpacing:'0.05em' }}>OEM</div>
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:0 }}>Original Equipment Manufacturing</h2>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.7, marginBottom:24 }}>
                Manufacture your existing designs with your brand identity. We produce exactly to your specifications.
              </p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {OEM_FEATURES.map(f => (
                  <li key={f} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <CheckCircle size={16} style={{ color:'#D4AF37', flexShrink:0, marginTop:2 }} />
                    <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#EAE1D4' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* ODM Card */}
            <div className="card-dark reveal delay-200" style={{ padding:40 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                <div style={{ width:48, height:48, borderRadius:10, background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:14, color:'#D72638', letterSpacing:'0.05em' }}>ODM</div>
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:0 }}>Original Design Manufacturing</h2>
              </div>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.7, marginBottom:24 }}>
                Don't have a design yet? Our team handles everything from concept to finished product under your brand.
              </p>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {ODM_FEATURES.map(f => (
                  <li key={f} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <CheckCircle size={16} style={{ color:'#D72638', flexShrink:0, marginTop:2 }} />
                    <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#EAE1D4' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="section-gap" style={{ background:'#16130B' }}>
        <div className="container-main" ref={ref2}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
            <span className="section-label">Production Process</span>
            <span className="gold-divider" style={{ margin:'16px auto' }} />
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0 }}>
              6-Stage Production Workflow
            </h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {MANUFACTURING_STEPS.map((step, i) => (
              <div key={i} className={`reveal delay-${(i%3+1)*100}`} style={{ display:'flex', gap:32, padding:'32px 0', borderBottom:'1px solid #2A2A2D', alignItems:'flex-start' }}>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:48, color:'rgba(212,175,55,0.15)', lineHeight:1, flexShrink:0, minWidth:80 }}>{step.step}</div>
                <div style={{ borderLeft:'2px solid rgba(212,175,55,0.3)', paddingLeft:24, flex:1 }}>
                  <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'0 0 10px 0' }}>{step.title}</h3>
                  <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.7, margin:0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mid CTA */}
          <div className="reveal" style={{ textAlign:'center', marginTop:64 }}>
            <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 40px' }}>
              <WhatsAppIcon size={16}/> START YOUR ORDER
            </a>
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section className="section-gap" style={{ background:'#0F0F10' }} id="quality">
        <div className="container-main" ref={ref3}>
          <div className="reveal" style={{ marginBottom:64 }}>
            <span className="section-label">Quality Assurance</span>
            <span className="gold-divider" />
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(26px,4vw,48px)', letterSpacing:'-0.01em', color:'#EAE1D4', margin:0, maxWidth:480 }}>
              100% Inspection Protocol
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 280px),1fr))', gap:24 }}>
            {QC_STEPS.map((qc, i) => (
              <div key={i} className={`reveal delay-${(i%3+1)*100}`} style={{ padding:28, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12 }}>
                <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:32, color:'rgba(212,175,55,0.2)', letterSpacing:'-0.03em', marginBottom:16, lineHeight:1 }}>0{i+1}</div>
                <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:'0 0 10px 0' }}>{qc.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:1.7, margin:0 }}>{qc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment + Shipping */}
      <section className="section-gap" style={{ background:'#16130B' }}>
        <div className="container-main" ref={ref4}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 340px),1fr))', gap:48 }}>
            {/* Equipment */}
            <div>
              <div className="reveal" style={{ marginBottom:40 }}>
                <span className="section-label">Factory Equipment</span>
                <span className="gold-divider" />
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(22px,3vw,36px)', color:'#EAE1D4', margin:0 }}>State-of-the-Art Machinery</h2>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {EQUIPMENT.map((eq, i) => (
                  <div key={i} className="reveal" style={{ transitionDelay:`${i*80}ms`, display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'20px 0', borderBottom:'1px solid #2A2A2D' }}>
                    <div>
                      <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:14, color:'#EAE1D4' }}>{eq.name}</div>
                      <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', marginTop:4 }}>{eq.desc}</div>
                    </div>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:22, color:'#D4AF37', letterSpacing:'-0.02em', flexShrink:0, marginLeft:16 }}>{eq.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div>
              <div className="reveal" style={{ marginBottom:40 }}>
                <span className="section-label">Shipping & Logistics</span>
                <span className="gold-divider" />
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(22px,3vw,36px)', color:'#EAE1D4', margin:0 }}>Global Delivery Terms</h2>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {SHIPPING_OPTIONS.map((opt, i) => (
                  <div key={i} className="reveal" style={{ transitionDelay:`${i*100}ms`, padding:20, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:10 }}>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:14, color:'#D4AF37', marginBottom:6 }}>{opt.term}</div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#A1A1A1', lineHeight:1.6 }}>{opt.desc}</div>
                  </div>
                ))}
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
            <span className="badge badge-gold" style={{ marginBottom:20, position:'relative' }}>Start Manufacturing</span>
            <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(24px,4vw,48px)', color:'#EAE1D4', margin:'16px auto 20px', maxWidth:560, lineHeight:1.2, position:'relative' }}>
              Ready to Start Production?
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,2vw,17px)', color:'#A1A1A1', maxWidth:440, margin:'0 auto 36px', lineHeight:1.7, position:'relative' }}>
              Sampling in 7–10 days. Bulk production in 30–45 days. Contact us today.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
              <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 36px' }}>
                <WhatsAppIcon size={16}/> GET A QUOTE
              </a>
              <Link to="/contact" className="btn-secondary" style={{ padding:'16px 36px' }}>SEND INQUIRY</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
