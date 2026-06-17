// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Mail, Phone, MapPin, Trash2, Calendar, FileText, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  useEffect(() => { document.title = 'Inquiries | Tawan Impex Portal'; }, []);

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0 });

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/inquiries');
      if (res.data.success) {
        setInquiries(res.data.data);
        // Calculate simple stats
        const total = res.data.data.length;
        const pending = res.data.data.filter(x => x.status === 'pending').length;
        const reviewed = total - pending;
        setStats({ total, pending, reviewed });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/inquiries/${id}/status`, { status });
      if (res.data.success) {
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));
        if (selected && selected._id === id) {
          setSelected(prev => ({ ...prev, status }));
        }
        // Recalculate stats
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      const res = await api.delete(`/inquiries/${id}`);
      if (res.data.success) {
        setInquiries(prev => prev.filter(inq => inq._id !== id));
        if (selected && selected._id === id) setSelected(null);
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'4px 10px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', color:'#D4AF37', borderRadius:20, fontSize:11, fontFamily:'Montserrat,sans-serif', fontWeight:700, letterSpacing:'0.03em', textTransform:'uppercase' }}><Clock size={12}/> Pending</span>;
      default:
        return <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'4px 10px', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.2)', color:'#25D366', borderRadius:20, fontSize:11, fontFamily:'Montserrat,sans-serif', fontWeight:700, letterSpacing:'0.03em', textTransform:'uppercase' }}><CheckCircle size={12}/> Reviewed</span>;
    }
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:40 }}>
        <div>
          <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:32, color:'#EAE1D4', margin:0 }}>Inquiries</h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', marginTop:4 }}>Review and manage prospective B2B bulk orders and submissions.</p>
        </div>
      </div>

      {/* Stats Board */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:20, marginBottom:40 }}>
        {[
          { label: 'Total Inquiries', value: stats.total, color: '#EAE1D4' },
          { label: 'Pending Response', value: stats.pending, color: '#D4AF37' },
          { label: 'Reviewed Leads', value: stats.reviewed, color: '#25D366' },
        ].map((item, i) => (
          <div key={i} style={{ padding:24, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12 }}>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', letterSpacing:'0.06em', textTransform:'uppercase' }}>{item.label}</div>
            <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:36, color:item.color, marginTop:8 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 400px' : '1fr', gap:24, alignItems:'flex-start' }}>
        {/* Table List */}
        <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, overflow:'hidden' }}>
          {loading ? (
            <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>No inquiries received yet.</div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left', fontFamily:'Inter,sans-serif', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'#16130B', borderBottom:'1px solid #2A2A2D' }}>
                    <th style={{ padding:'16px 20px', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase' }}>Inquirer / Company</th>
                    <th style={{ padding:'16px 20px', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase' }}>Product & MOQ</th>
                    <th style={{ padding:'16px 20px', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase' }}>Country</th>
                    <th style={{ padding:'16px 20px', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase' }}>Status</th>
                    <th style={{ padding:'16px 20px', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, color:'#A1A1A1', letterSpacing:'0.05em', textTransform:'uppercase' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(inq => (
                    <tr
                      key={inq._id}
                      onClick={() => setSelected(inq)}
                      style={{
                        borderBottom:'1px solid #2A2A2D',
                        cursor:'pointer',
                        background: selected?._id === inq._id ? 'rgba(212,175,55,0.03)' : 'transparent',
                        transition:'background 0.2s',
                        hoverBackground:'rgba(255,255,255,0.01)'
                      }}
                    >
                      <td style={{ padding:'16px 20px' }}>
                        <div style={{ fontWeight:600, color:'#EAE1D4' }}>{inq.name}</div>
                        <div style={{ color:'#A1A1A1', fontSize:12, marginTop:2 }}>{inq.company}</div>
                      </td>
                      <td style={{ padding:'16px 20px' }}>
                        <div style={{ color:'#EAE1D4' }}>{inq.productType}</div>
                        <div style={{ color:'#A1A1A1', fontSize:12, marginTop:2 }}>Req: {inq.quantity}</div>
                      </td>
                      <td style={{ padding:'16px 20px', color:'#EAE1D4' }}>{inq.country}</td>
                      <td style={{ padding:'16px 20px' }}>{getStatusBadge(inq.status)}</td>
                      <td style={{ padding:'16px 20px', color:'#A1A1A1', fontSize:12 }}>
                        {new Date(inq.createdAt).toLocaleDateString(undefined, { month:'short', day:'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar details */}
        {selected && (
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, padding:28, position:'sticky', top:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
              <div>
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#A1A1A1', letterSpacing:'0.06em', textTransform:'uppercase' }}>Inquiry Details</span>
                <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'4px 0 0 0' }}>{selected.company}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background:'transparent', border:0, color:'#A1A1A1', fontSize:20, cursor:'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:24 }}>
              {selected.status === 'pending' ? (
                <button
                  onClick={() => handleUpdateStatus(selected._id, 'reviewed')}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'10px', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.2)', color:'#25D366', borderRadius:8, fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, letterSpacing:'0.03em', cursor:'pointer' }}
                >
                  MARK REVIEWED
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus(selected._id, 'pending')}
                  style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'10px', background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', color:'#D4AF37', borderRadius:8, fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, letterSpacing:'0.03em', cursor:'pointer' }}
                >
                  MARK PENDING
                </button>
              )}

              <button
                onClick={() => handleDelete(selected._id)}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40, background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', color:'#D72638', borderRadius:8, cursor:'pointer' }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:16, borderBottom:'1px solid #2A2A2D', paddingBottom:20, marginBottom:20 }}>
              <div style={{ display:'flex', gap:10 }}>
                <Mail size={16} style={{ color:'#D4AF37', marginTop:2 }} />
                <div>
                  <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Email Address</div>
                  <a href={`mailto:${selected.email}`} style={{ fontSize:13, color:'#EAE1D4', textDecoration:'none', wordBreak:'break-all' }}>{selected.email}</a>
                </div>
              </div>

              {selected.phone && (
                <div style={{ display:'flex', gap:10 }}>
                  <Phone size={16} style={{ color:'#D4AF37', marginTop:2 }} />
                  <div>
                    <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Phone / WhatsApp</div>
                    <a href={`tel:${selected.phone}`} style={{ fontSize:13, color:'#EAE1D4', textDecoration:'none' }}>{selected.phone}</a>
                  </div>
                </div>
              )}

              <div style={{ display:'flex', gap:10 }}>
                <MapPin size={16} style={{ color:'#D4AF37', marginTop:2 }} />
                <div>
                  <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Country Origin</div>
                  <div style={{ fontSize:13, color:'#EAE1D4' }}>{selected.country}</div>
                </div>
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <Calendar size={16} style={{ color:'#D4AF37', marginTop:2 }} />
                <div>
                  <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Submission Date</div>
                  <div style={{ fontSize:13, color:'#EAE1D4' }}>{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>Specifications & Message</div>
              <p style={{ fontSize:13, color:'#EAE1D4', lineHeight:1.6, background:'#0F0F10', padding:16, borderRadius:8, margin:0, whiteSpace:'pre-wrap' }}>
                {selected.message || 'No text specifications provided.'}
              </p>
            </div>

            {selected.uploadedDesign && (
              <div>
                <div style={{ fontSize:11, color:'#A1A1A1', fontFamily:'Inter,sans-serif', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>Uploaded Technical Design</div>
                <a
                  href={selected.uploadedDesign.startsWith('/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/..${selected.uploadedDesign}` : selected.uploadedDesign}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:8, padding:'12px', background:'#0F0F10', border:'1px solid #2A2A2D', borderRadius:8, color:'#D4AF37', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:11, textDecoration:'none', justifyContent:'center' }}
                >
                  <FileText size={16} /> VIEW TECHNICAL DESIGN
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
