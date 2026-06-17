// src/pages/admin/AdminProducts.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Edit, Trash, Upload, X } from 'lucide-react';

export default function AdminProducts() {
  useEffect(() => { document.title = 'Products CRUD | Tawan Impex Portal'; }, []);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null if adding
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // id awaiting confirm
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name:'', category:'', description:'', shortDescription:'',
    images:[], materials:'', minimumOrderQuantity:50, featured:false
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditing(null);
    setForm({
      name:'', category:'', description:'', shortDescription:'',
      images:[], materials:'', minimumOrderQuantity:50, featured:false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      description: p.description,
      shortDescription: p.shortDescription,
      images: p.images || [],
      materials: (p.materials || []).join(', '),
      minimumOrderQuantity: p.minimumOrderQuantity || 50,
      featured: p.featured || false
    });
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
        // Resolve absolute URL — strip /api from base to get backend root
        let url = res.data.data.url;
        if (url.startsWith('/')) {
          const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');
          url = `${backendBase}${url}`;
        }
        setForm(f => ({ ...f, images: [...f.images, url] }));
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.category) {
      alert('Please select a category');
      return;
    }

    const payload = {
      ...form,
      materials: form.materials.split(',').map(m => m.trim()).filter(Boolean),
      minimumOrderQuantity: Number(form.minimumOrderQuantity)
    };

    try {
      if (editing) {
        await api.put(`/products/${editing._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:40 }}>
        <div>
          <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:32, color:'#EAE1D4', margin:0 }}>Products</h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', marginTop:4 }}>Add, edit, or delete items from the B2B catalog.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary" style={{ padding:'12px 24px' }}>
          <Plus size={16} /> ADD PRODUCT
        </button>
      </div>

      {loading ? (
        <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>Loading product catalog...</div>
      ) : products.length === 0 ? (
        <div style={{ padding:64, textAlign:'center', color:'#A1A1A1', fontFamily:'Inter,sans-serif', background:'#1B1B1D', borderRadius:12, border:'1px solid #2A2A2D' }}>No products found. Add your first item.</div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:24 }}>
          {products.map(p => (
            <div key={p._id} style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column' }}>
              <div style={{ height:180, background:'#0F0F10', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <span style={{ fontSize:40 }}>🛍️</span>
                )}
                {p.featured && (
                  <span style={{ position:'absolute', top:12, left:12, background:'#D4AF37', color:'#0F0F10', fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:9, padding:'4px 8px', borderRadius:4, letterSpacing:'0.05em' }}>FEATURED</span>
                )}
              </div>
              <div style={{ padding:20, flex:1, display:'flex', flexDirection:'column' }}>
                <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'#D4AF37', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>{p.category}</span>
                <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:16, color:'#EAE1D4', margin:'0 0 8px 0', lineClamp:1 }}>{p.name}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#A1A1A1', lineHeight:1.5, margin:'0 0 16px 0', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', flex:1 }}>
                  {p.shortDescription}
                </p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #2A2A2D', paddingTop:16 }}>
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1' }}>MOQ: <strong style={{ color:'#EAE1D4' }}>{p.minimumOrderQuantity} pcs</strong></span>
                  <div style={{ display:'flex', gap:8 }}>
                    {confirmDeleteId === p._id ? (
                      // Inline confirmation — no browser dialog needed
                      <>
                        <span style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#D72638', display:'flex', alignItems:'center' }}>Sure?</span>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={deleting}
                          style={{ padding:'8px 12px', background:'rgba(215,38,56,0.85)', border:'1px solid rgba(215,38,56,0.6)', borderRadius:6, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700 }}
                        >
                          {deleting ? '...' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          style={{ padding:'8px 12px', background:'rgba(255,255,255,0.05)', border:'1px solid #2A2A2D', borderRadius:6, color:'#A1A1A1', cursor:'pointer', fontSize:12 }}
                        >
                          No
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          style={{ padding:'8px 12px', background:'rgba(255,255,255,0.05)', border:'1px solid #2A2A2D', borderRadius:6, color:'#EAE1D4', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:12 }}
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(p._id)}
                          style={{ padding:'8px 12px', background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', borderRadius:6, color:'#D72638', cursor:'pointer', display:'flex', alignItems:'center', gap:4, fontSize:12 }}
                        >
                          <Trash size={12} /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.8)', zIndex:999, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
          <div style={{ background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:16, width:'100%', maxWidth:600, maxHeight:'90vh', overflowY:'auto', padding:36 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:22, color:'#EAE1D4', margin:0 }}>
                {editing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background:'transparent', border:0, color:'#A1A1A1', fontSize:24, cursor:'pointer' }}>&times;</button>
            </div>

            <form onSubmit={handleSave} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label className="input-label">Product Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Elite Striker Jersey" />
                </div>
                <div>
                  <label className="input-label">Category *</label>
                  <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field" style={{ appearance:'none' }}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="input-label">Short Description *</label>
                <input required value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className="input-field" placeholder="Brief tagline display for list view" />
              </div>

              <div>
                <label className="input-label">Detailed Description *</label>
                <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field" rows={4} placeholder="Full description for detail page modal" style={{ resize:'vertical' }} />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label className="input-label">Minimum Order Quantity (MOQ) *</label>
                  <input required type="number" value={form.minimumOrderQuantity} onChange={e => setForm({ ...form, minimumOrderQuantity: e.target.value })} className="input-field" />
                </div>
                <div style={{ display:'flex', alignItems:'center', marginTop:28 }}>
                  <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontFamily:'Inter,sans-serif', fontSize:13, color:'#EAE1D4' }}>
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} style={{ accentColor:'#D4AF37', width:16, height:16 }} />
                    Feature on Home page
                  </label>
                </div>
              </div>

              <div>
                <label className="input-label">Materials & Fabric Spec (comma-separated)</label>
                <input value={form.materials} onChange={e => setForm({ ...form, materials: e.target.value })} className="input-field" placeholder="100% Polyester, Moisture-Wicking, Anti-Microbial" />
              </div>

              {/* Media gallery upload inside modal */}
              <div>
                <label className="input-label">Product Gallery Images</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginBottom:12 }}>
                  {form.images.map((img, i) => (
                    <div key={i} style={{ width:80, height:80, border:'1px solid #2A2A2D', borderRadius:8, overflow:'hidden', position:'relative' }}>
                      <img src={img} alt="Product preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        style={{ position:'absolute', top:2, right:2, width:20, height:20, borderRadius:'50%', background:'rgba(215,38,56,0.8)', border:0, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  <label style={{ width:80, height:80, border:'2px dashed #2A2A2D', borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', background:'#0F0F10' }}>
                    <Upload size={18} style={{ color:'#A1A1A1', marginBottom:4 }} />
                    <span style={{ fontSize:9, color:'#A1A1A1', fontFamily:'Inter,sans-serif' }}>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div style={{ display:'flex', gap:12, marginTop:16 }}>
                <button type="submit" className="btn-primary" style={{ flex:1, padding:14, justifyContent:'center', fontSize:13 }}>
                  SAVE PRODUCT
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
