// src/pages/admin/AdminSettings.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Check } from 'lucide-react';

export default function AdminSettings() {
  useEffect(() => { document.title = 'Settings | Tawan Impex Portal'; }, []);

  const [form, setForm] = useState({
    companyName: '',
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: '',
    address: '',
    seoTitle: '',
    seoDescription: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.success) {
          setForm({
            companyName:     res.data.data.companyName || '',
            contactPhone:    res.data.data.contactPhone || '',
            contactEmail:    res.data.data.contactEmail || '',
            whatsappNumber:  res.data.data.whatsappNumber || '',
            address:         res.data.data.address || '',
            seoTitle:        res.data.data.seoTitle || '',
            seoDescription:  res.data.data.seoDescription || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const res = await api.put('/settings', form);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth:680 }}>
      <div style={{ marginBottom:40 }}>
        <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:32, color:'#EAE1D4', margin:0 }}>Settings</h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', marginTop:4 }}>Configure brand contact credentials and search engine listings.</p>
      </div>

      {loading ? (
        <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Loading settings...</div>
      ) : (
        <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:28 }}>
          {success && (
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:16, background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.2)', borderRadius:8, color:'#25D366', fontSize:13, fontFamily:'Inter,sans-serif' }}>
              <Check size={16} /> Global settings saved successfully!
            </div>
          )}

          {/* Section: Contact details */}
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, padding:32 }}>
            <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:'0 0 20px 0', borderBottom:'1px solid #2A2A2D', paddingBottom:12 }}>Contact Credentials</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label className="input-label">Company Brand Name</label>
                  <input value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="input-label">WhatsApp Contact Number (No spaces/symbols)</label>
                  <input value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} className="input-field" placeholder="e.g. 923376123116" />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label className="input-label">Inquiry Mail Receiver</label>
                  <input type="email" value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Display Phone Number</label>
                  <input value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Headquarters Address</label>
                <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="input-field" rows={2} style={{ resize:'none' }} />
              </div>
            </div>
          </div>

          {/* Section: SEO */}
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, padding:32 }}>
            <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:'0 0 20px 0', borderBottom:'1px solid #2A2A2D', paddingBottom:12 }}>SEO & Search Listings</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div>
                <label className="input-label">Meta Title Template</label>
                <input value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="input-label">Meta Description Template</label>
                <textarea value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} className="input-field" rows={3} style={{ resize:'none' }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ padding:'16px', justifyContent:'center', fontSize:13, letterSpacing:'0.05em', cursor:'pointer' }}
          >
            {saving ? 'SAVING GLOBAL CONFIG…' : 'SAVE CONFIGURATION'}
          </button>
        </form>
      )}
    </div>
  );
}
