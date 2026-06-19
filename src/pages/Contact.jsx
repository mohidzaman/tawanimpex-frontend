// src/pages/Contact.jsx
import { useEffect, useState, useRef } from 'react';
import { MapPin, Mail, Phone, Upload, Check, AlertCircle, Loader } from 'lucide-react';
import { SITE, WHATSAPP_URL } from '../utils/constants';
import { inquiryService } from '../services/inquiryService';
import { useStaggerReveal } from '../hooks/useScrollReveal';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

const PRODUCT_TYPES = [
  'Soccer Kits', 'Basketball Uniforms', 'Tracksuits', 'Fitness Apparel',
  'Teamwear', 'Custom ODM', 'Hoodies & Joggers', 'Other',
];

const COUNTRIES = [
  'United States','United Kingdom','Germany','France','Netherlands','Australia',
  'Canada','UAE','Saudi Arabia','Italy','Spain','Belgium','Pakistan','India','Other',
];

export default function Contact() {
  useEffect(() => { document.title = 'B2B Technical Inquiry | Tawan Impex — Sportswear OEM'; }, []);

  const ref = useStaggerReveal();
  const heroRef = useStaggerReveal();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name:'', company:'', country:'', email:'', phone:'',
    productType:'', quantity:'', message:'', file:null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('File size must be less than 10MB.');
        return;
      }
      setErrorMsg('');
      setForm(f => ({ ...f, file }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('company', form.company);
      formData.append('country', form.country);
      formData.append('email', form.email);
      if (form.phone) formData.append('phone', form.phone);
      formData.append('productType', form.productType);
      formData.append('quantity', form.quantity);
      if (form.message) formData.append('message', form.message);
      if (form.file) formData.append('uploadedDesign', form.file);

      await inquiryService.submit(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.friendlyMessage ||
        err.response?.data?.message ||
        'Failed to submit inquiry. Please try again or message us on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

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
                <span className="section-label">International Sales Desk</span>
                <span className="gold-divider" style={{ margin:'12px 0 20px 0' }} />
              </div>
              <div className="reveal delay-100">
                <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(32px,5vw,60px)', lineHeight:1.1, letterSpacing:'-0.019em', color:'#EAE1D4', margin:'0 0 20px 0' }}>
                  Initiate Manufacturing Project
                </h1>
              </div>
              <div className="reveal delay-200">
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(16px,2vw,18px)', color:'#A1A1A1', maxWidth:580, lineHeight:1.7, margin:'0 0 40px 0' }}>
                  Ready to scale your apparel division? Submit your specifications below or connect directly to our plant manager for immediate assistance. We facilitate global B2B delivery.
                </p>
              </div>
              <div className="reveal delay-300" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 32px' }}>
                  <WhatsAppIcon size={16}/> DIRECT FACTORY HOTLINE
                </a>
              </div>
            </div>
            {/* Image Column */}
            <div className="hero-image-col reveal delay-200" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
              <div className="hero-img-wrapper" style={{ position:'relative', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)', padding:8, background:'rgba(27,27,29,0.5)', backdropFilter:'blur(10px)', width:'100%', maxWidth:540, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/contact_hero.png"
                  alt="Tawan Impex B2B Operations HQ"
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

      {/* Contact Info + Form */}
      <section className="section-gap" style={{ background:'#0F0F10' }}>
        <div className="container-main" ref={ref}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 320px),1fr))', gap:64 }}>
            {/* Left: Contact Info + WhatsApp Card */}
            <div>
              <div className="reveal" style={{ marginBottom:40 }}>
                <span className="section-label">Operations HQ</span>
                <span className="gold-divider" />
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:600, fontSize:'clamp(22px,3vw,36px)', letterSpacing: '-0.01em', color:'#EAE1D4', margin:0 }}>
                  Contact Channels
                </h2>
              </div>

              <div className="reveal delay-100" style={{ display:'flex', flexDirection:'column', gap:24, marginBottom:40 }}>
                {[
                  { icon:<Phone size={18}/>, label:'Direct Line (Global Sales)', value:SITE.phone, href:`tel:${SITE.phone.replace(/\s/g,'')}` },
                  { icon:<Mail size={18}/>,  label:'B2B Export Mailbox',        value:SITE.email, href:`mailto:${SITE.email}` },
                  { icon:<MapPin size={18}/>,label:'Manufacturing Complex', value:SITE.address, href:null },
                ].map((item,i) => (
                  <div key={i} style={{ display:'flex', gap:20, padding:24, background:'#121214', border:'1px solid #2A2A2D', borderRadius:16 }}>
                    <div style={{ width:48, height:48, borderRadius:12, background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#D4AF37', flexShrink:0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'#A1A1A1', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#EAE1D4', textDecoration:'none', fontWeight: 600 }}>{item.value}</a>
                      ) : (
                        <div style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#EAE1D4', lineHeight:1.6 }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Card */}
              <div className="reveal delay-200" style={{ background:'#121214', border:'1px solid rgba(212,175,55,0.25)', borderRadius:20, padding:36, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:'-30%', right:'-20%', width:'200px', height:'200px', background:'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', color: '#fff' }}>
                    <WhatsAppIcon size={24} />
                  </div>
                  <div>
                    <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:17, color:'#EAE1D4' }}>Live Plant Desk</div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#A1A1A1' }}>Bypasses email queues</div>
                  </div>
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', lineHeight:1.7, marginBottom:28 }}>
                  Connect instantly to receive prototyping lead times, check current factory capacity status, or discuss target pricing thresholds.
                </p>
                <a
                  href={WHATSAPP_URL()}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 24px', background:'#25D366', borderRadius:12, color:'#fff', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:13, letterSpacing:'0.05em', textDecoration:'none', justifyContent:'center' }}
                >
                  <WhatsAppIcon size={16} /> CONNECT LIVE NOW
                </a>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div>
              <div className="reveal" style={{ marginBottom:40 }}>
                <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:'clamp(24px,3vw,36px)', color:'#EAE1D4', margin:0, letterSpacing: '-0.01em' }}>
                  Technical Design Request
                </h2>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1', marginTop:12, lineHeight:1.7 }}>
                  Provide project requirements below to receive a formal commercial proposal and lead time analysis from our sales office.
                </p>
              </div>

              {submitted ? (
                <div className="reveal" style={{ padding:60, background:'#121214', border:'1px solid rgba(212,175,55,0.3)', borderRadius:20, textAlign:'center' }}>
                  <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(212,175,55,0.1)', border:'2px solid #D4AF37', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', color:'#D4AF37' }}>
                    <Check size={36} />
                  </div>
                  <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:'0 0 16px 0' }}>Request Logged Successfully</h3>
                  <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#A1A1A1', lineHeight:1.7, marginBottom:32 }}>
                    Your design parameters have been routed to our production office. A technical sales representative will contact you shortly.
                  </p>
                  <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '16px 36px' }}>
                    <WhatsAppIcon size={16}/> ESCALATE TO WHATSAPP HOTLINE
                  </a>
                </div>
              ) : (
                <form className="reveal" onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:24 }}>
                  {errorMsg && (
                    <div style={{ display:'flex', gap:10, padding:16, background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.3)', borderRadius:12, color:'#D72638', fontSize:14, alignItems:'center' }}>
                      <AlertCircle size={20} style={{ flexShrink:0 }} />
                      <div>{errorMsg}</div>
                    </div>
                  )}

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap:20 }}>
                    <div>
                      <label className="input-label">Buyer Name *</label>
                      <input required name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Full Name" style={{ background: '#121214', border: '1px solid #2A2A2D' }} />
                    </div>
                    <div>
                      <label className="input-label">Company / Entity *</label>
                      <input required name="company" value={form.company} onChange={handleChange} className="input-field" placeholder="Registered Brand Name" style={{ background: '#121214', border: '1px solid #2A2A2D' }} />
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap:20 }}>
                    <div>
                      <label className="input-label">Destination Country *</label>
                      <select required name="country" value={form.country} onChange={handleChange} className="input-field" style={{ appearance:'none', background: '#121214', border: '1px solid #2A2A2D' }}>
                        <option value="">Select Region</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="input-label">Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="Country Code Included" style={{ background: '#121214', border: '1px solid #2A2A2D' }} />
                    </div>
                  </div>
                  <div>
                    <label className="input-label">Business Email Address *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="procurement@yourbrand.com" style={{ background: '#121214', border: '1px solid #2A2A2D' }} />
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap:20 }}>
                    <div>
                      <label className="input-label">Apparel Category *</label>
                      <select required name="productType" value={form.productType} onChange={handleChange} className="input-field" style={{ appearance:'none', background: '#121214', border: '1px solid #2A2A2D' }}>
                        <option value="">Select Division</option>
                        {PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="input-label">Expected Batch Quantity (MOQ 50) *</label>
                      <input required name="quantity" value={form.quantity} onChange={handleChange} className="input-field" placeholder="Minimum 50 pieces" style={{ background: '#121214', border: '1px solid #2A2A2D' }} />
                    </div>
                  </div>
                  <div>
                    <label className="input-label">Fabric Specifications / Technical Brief</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      className="input-field" rows={5}
                      placeholder="Specify GSM weights, panel fits, yarn compositions, or finishing requirements..."
                      style={{ resize:'vertical', background: '#121214', border: '1px solid #2A2A2D' }}
                    />
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="input-label">Attach Design Sheets / Tech-packs (Max 10MB)</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      style={{
                        border:`2px dashed ${dragOver ? '#D4AF37' : '#2A2A2D'}`,
                        borderRadius:12, padding:'32px 20px', textAlign:'center',
                        cursor:'pointer', background: dragOver ? 'rgba(212,175,55,0.04)' : '#121214',
                        transition:'border-color 0.3s ease, background 0.3s ease',
                      }}
                    >
                      <Upload size={28} style={{ color:'#A1A1A1', margin:'0 auto 10px' }} />
                      <div style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: form.file ? '#D4AF37' : '#A1A1A1' }}>
                        {form.file ? form.file.name : 'Choose file or drag & drop (PDF, AI, PNG, JPG)'}
                      </div>
                    </div>
                    <input ref={fileRef} type="file" accept=".pdf,.ai,.png,.jpg,.jpeg" style={{ display:'none' }} onChange={e => handleFile(e.target.files[0])} />
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary" style={{ justifyContent:'center', padding:'18px', fontSize:14, fontWeight: 700, borderRadius: 12, opacity: submitting ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                    {submitting ? (
                      <>
                        <Loader className="animate-spin" size={16} />
                        PROCESSING SECURE UPLOAD…
                      </>
                    ) : (
                      'TRANSMIT MANUFACTURING INQUIRY'
                    )}
                  </button>
                  <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', textAlign:'center', margin:0 }}>
                    Inquiries are transmitted via end-to-end encrypted tunnels directly to our secure CRM database.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
