// src/pages/admin/AdminCategories.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Edit, Trash, Upload, X } from 'lucide-react';

export default function AdminCategories() {
  useEffect(() => { document.title = 'Categories CRUD | Tawan Impex Portal'; }, []);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({ name: '', image: '', description: '' });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditing(null);
    setForm({ name: '', image: '', description: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, image: c.image || '', description: c.description || '' });
    setModalOpen(true);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('mediaFile', file);

    try {
      const res = await api.post('/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        let url = res.data.data.url;
        if (url.startsWith('/')) {
          url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/..${url}`;
        }
        setForm(f => ({ ...f, image: url }));
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/categories/${editing._id}`, form);
      } else {
        await api.post('/categories', form);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? All products using it will still exist but lack category filtering.')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40 }}>
        <div>
          <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:32, color:'#EAE1D4', margin:0 }}>Categories</h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', marginTop:4 }}>Add, edit, or delete catalog divisions.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding:'12px 24px' }}>
          <Plus size={16} /> ADD CATEGORY
        </button>
      </div>

      {loading ? (
        <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Loading categories...</div>
      ) : categories.length === 0 ? (
        <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif', background:'#1B1B1D', borderRadius:12, border:'1px solid #2A2A2D' }}>No categories found. Create one to classify products.</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24 }}>
          {categories.map(c => (
            <div key={c._id} style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column' }}>
              <div style={{ height:150, background:'#0F0F10', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                {c.image ? (
                  <img src={c.image} alt={c.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <span style={{ fontSize:40 }}>📂</span>
                )}
              </div>
              <div style={{ padding:20, flex:1, display:'flex', flexDirection:'column' }}>
                <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:18, color:'#EAE1D4', margin:'0 0 6px 0' }}>{c.name}</h3>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#D4AF37', letterSpacing:'0.05em', marginBottom:12 }}>slug: {c.slug}</div>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#A1A1A1', lineHeight:1.5, margin:'0 0 16px 0', flex:1 }}>
                  {c.description || 'No description provided.'}
                </p>
                <div style={{ display:'flex', gap:8, borderTop:'1px solid #2A2A2D', paddingTop:16, justifyContent:'flex-end' }}>
                  <button
                    onClick={() => handleOpenEdit(c)}
                    style={{ padding:'8px 12px', background:'rgba(255,255,255,0.05)', border:'1px solid #2A2A2D', borderRadius:6, color:'#EAE1D4', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:12 }}
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    style={{ padding:'8px 12px', background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', borderRadius:6, color:'#D72638', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:12 }}
                  >
                    <Trash size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.8)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:16, width:'100%', maxWidth:500, padding:36 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:0 }}>
                {editing ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background:'transparent', border:0, color:'#A1A1A1', fontSize:24, cursor:'pointer' }}>&times;</button>
            </div>

            <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div>
                <label className="input-label">Category Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Football Uniforms" />
              </div>

              <div>
                <label className="input-label">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} placeholder="Describe the type of gear classified here..." style={{ resize:'none' }} />
              </div>

              <div>
                <label className="input-label">Category Banner Image</label>
                {form.image ? (
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                    <div style={{ width:60, height:60, borderRadius:6, overflow:'hidden', border:'1px solid #2A2A2D' }}>
                      <img src={form.image} alt="Banner" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: '' })}
                      style={{ padding:'6px 12px', background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', borderRadius:6, color:'#D72638', fontSize:11, fontFamily:'Montserrat,sans-serif', fontWeight:700, cursor:'pointer' }}
                    >
                      REMOVE IMAGE
                    </button>
                  </div>
                ) : (
                  <label style={{ display:'flex', alignItems:'center', gap:8, padding:'12px', border:'2px dashed #2A2A2D', borderRadius:8, cursor:'pointer', background:'#0F0F10', justifyContent:'center' }}>
                    <Upload size={16} style={{ color:'#A1A1A1' }} />
                    <span style={{ fontSize:13, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>{uploading ? 'Uploading...' : 'Upload Category Banner'}</span>
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }} disabled={uploading} />
                  </label>
                )}
              </div>

              <div style={{ display:'flex', gap:12, marginTop:16 }}>
                <button type="submit" className="btn-primary" style={{ flex:1, padding:14, justifyContent:'center', fontSize:13 }}>
                  SAVE CATEGORY
                </button>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary" style={{ flex:1, padding:14, justifyContent:'center', fontSize:13 }}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
