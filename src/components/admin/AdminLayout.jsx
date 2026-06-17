// src/components/admin/AdminLayout.jsx
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FolderHeart, Settings as SettingsIcon, LogOut, ArrowLeft, Image as ImageIcon, Menu, X, Inbox } from 'lucide-react';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 769);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const token = localStorage.getItem('ti_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('ti_admin_token');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard',  label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
    { path: '/admin/inquiries',  label: 'Inquiries',     icon: <Inbox size={18} /> },
    { path: '/admin/products',   label: 'Products',      icon: <ShoppingBag size={18} /> },
    { path: '/admin/categories', label: 'Categories',    icon: <FolderHeart size={18} /> },
    { path: '/admin/media',      label: 'Media Gallery', icon: <ImageIcon size={18} /> },
    { path: '/admin/settings',   label: 'Settings',      icon: <SettingsIcon size={18} /> },
  ];

  const sidebarVisible = isDesktop || mobileOpen;

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'#0F0F10', color:'#EAE1D4', position:'relative' }}>
      {/* Mobile Drawer Backdrop */}
      {!isDesktop && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 998,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          borderRight: '1px solid #2A2A2D',
          background: '#121214',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          transform: sidebarVisible ? 'translateX(0)' : 'translateX(-260px)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #242427', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '0.05em', color: '#D4AF37' }}>
              TAWAN IMPEX
            </div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, color: '#8E8E93', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Admin Control Panel
            </div>
          </div>
          {!isDesktop && (
            <button
              onClick={() => setMobileOpen(false)}
              style={{ background: 'none', border: 'none', color: '#8E8E93', cursor: 'pointer', padding: 4 }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Nav */}
        <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontFamily: 'Montserrat,sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  color: isActive ? '#D4AF37' : '#8E8E93',
                  background: isActive ? 'rgba(212,175,55,0.05)' : 'transparent',
                  border: isActive ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: 24, borderTop: '1px solid #242427', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Inter,sans-serif',
              fontSize: 12,
              color: '#8E8E93',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '12px',
              borderRadius: 10,
              background: 'rgba(198,63,71,0.1)',
              border: '1px solid rgba(198,63,71,0.2)',
              color: '#C63F47',
              fontFamily: 'Montserrat,sans-serif',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
          >
            <LogOut size={14} /> LOGOUT PORTAL
          </button>
        </div>
      </aside>

      {/* Main Content Area — offset by sidebar width on desktop */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto',
        marginLeft: isDesktop ? 260 : 0,
        transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Top Header */}
        <header style={{ height: 70, borderBottom: '1px solid #242427', background: '#121214', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
          {/* Hamburger — mobile only */}
          {!isDesktop && (
            <button
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: 'none', color: '#EAE1D4', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Menu size={24} />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4AF37' }} />
            <span style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.05em', color: '#8E8E93', textTransform: 'uppercase' }}>
              Administrator Mode
            </span>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '40px 32px', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
