// src/pages/admin/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminLogin() {
  useEffect(() => { document.title = 'Login | Tawan Impex Portal'; }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('ti_admin_token', res.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid administrator credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0F0F10', padding:24 }}>
      <div style={{ width:'100%', maxWidth:420, background:'#1B1B1D', border:'1px solid #2A2A2D', borderRadius:16, padding:40 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:20, color:'#D4AF37', letterSpacing:'0.05em' }}>
            TAWAN IMPEX
          </div>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#A1A1A1', marginTop:8 }}>
            B2B Factory Control Panel Authentication
          </p>
        </div>

        {error && (
          <div style={{ padding:14, background:'rgba(215,38,56,0.1)', border:'1px solid rgba(215,38,56,0.2)', borderRadius:8, color:'#D72638', fontSize:13, fontFamily:'Inter,sans-serif', marginBottom:20, lineHeight:1.5 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div>
            <label className="input-label" style={{ marginBottom:8, display:'block' }}>Administrator Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              placeholder="admin@tawanimpex.com"
            />
          </div>
          <div>
            <label className="input-label" style={{ marginBottom:8, display:'block' }}>Secret Key Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ justifyContent:'center', padding:14, fontSize:13, letterSpacing:'0.05em', marginTop:8, cursor:'pointer' }}
          >
            {loading ? 'AUTHENTICATING…' : 'SECURE SIGN IN'}
          </button>
        </form>
      </div>
    </section>
  );
}
