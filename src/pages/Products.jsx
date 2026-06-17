// src/pages/Products.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, X, ArrowRight, Loader } from 'lucide-react';
import { PRODUCT_CATEGORIES, WHATSAPP_URL } from '../utils/constants';
import { productService, categoryService } from '../services/productService';
import { useStaggerReveal } from '../hooks/useScrollReveal';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.99 2C6.477 2 2 6.477 2 11.99c0 1.89.524 3.659 1.435 5.163L2 22l5.003-1.412A9.956 9.956 0 0011.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.16a8.19 8.19 0 01-4.205-1.16l-.3-.178-3.111.877.843-3.03-.196-.31A8.2 8.2 0 013.84 11.99 8.16 8.16 0 0111.99 3.84 8.16 8.16 0 0120.16 11.99a8.16 8.16 0 01-8.17 8.17z"/>
    </svg>
  );
}

function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: '#121214', border: '1px solid #2A2A2D' }}>
        <div style={{ padding: 40 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom:8 }}>{product.category.replace('-', ' ').toUpperCase()}</span>
              <h2 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:26, letterSpacing:'-0.01em', color:'#EAE1D4', margin:0 }}>{product.name}</h2>
            </div>
            <button onClick={onClose} style={{ background:'none', border:'none', color:'#A1A1A1', cursor:'pointer', padding:4 }}><X size={20}/></button>
          </div>

          {/* Product Image Gallery */}
          <div style={{ height:280, background:'#0F0F10', borderRadius:16, border:'1px solid #2A2A2D', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28, overflow:'hidden' }}>
            {product.images?.[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600&auto=format&fit=crop';
                }}
                style={{ width:'100%', height:'100%', objectFit:'cover' }} 
              />
            ) : (
              <div style={{ textAlign:'center', color:'#A1A1A1' }}>
                <div style={{ fontSize:56, marginBottom:8 }}>🛍️</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, letterSpacing:'0.05em' }}>TAWAN IMPEX SPECIFICATION</div>
              </div>
            )}
          </div>

          <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#A1A1A1', lineHeight:1.7, marginBottom:28 }}>{product.description || product.shortDescription}</p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:28 }}>
            <div style={{ padding:20, background:'#17171A', borderRadius:12, border:'1px solid #2A2A2D' }}>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:700, color:'#D4AF37', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Minimum Order (MOQ)</div>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:24, fontWeight:800, color:'#EAE1D4', letterSpacing:'-0.01em' }}>{product.minimumOrderQuantity || 50} units</div>
            </div>
            <div style={{ padding:20, background:'#17171A', borderRadius:12, border:'1px solid #2A2A2D' }}>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:10, fontWeight:700, color:'#D4AF37', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Standard Lead Time</div>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:24, fontWeight:800, color:'#EAE1D4', letterSpacing:'-0.01em' }}>30–45 Days</div>
            </div>
          </div>

          {product.materials && product.materials.length > 0 && (
            <div style={{ marginBottom:32 }}>
              <div style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'#A1A1A1', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>Material & Fabrication Specifications</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {product.materials.map(m => <span key={m} className="badge badge-muted" style={{ padding: '6px 12px', fontSize: 12 }}>{m}</span>)}
              </div>
            </div>
          )}

          <a
            href={WHATSAPP_URL(`Hi, I am interested in placing an OEM order for "${product.name}". MOQ: ${product.minimumOrderQuantity || 50} units. Please provide a formal manufacturing quote.`)}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ width:'100%', justifyContent:'center', color:'#0F0F10', padding: 16, borderRadius: 12 }}
          >
            <WhatsAppIcon size={18} /> REQUEST B2B PRODUCTION QUOTE
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div 
      className="card-dark" 
      style={{ 
        cursor:'pointer', 
        overflow:'hidden', 
        display:'flex', 
        flexDirection:'column', 
        height:'100%',
        background: '#121214',
        border: '1px solid #2A2A2D',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s'
      }} 
      onClick={() => onClick(product)}
    >
      <div style={{ height:220, background:'#0F0F10', borderBottom:'1px solid #2A2A2D', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        {product.featured && (
          <span 
            className="badge badge-gold" 
            style={{ 
              position:'absolute', 
              top:16, 
              right:16, 
              zIndex:2,
              background: '#D4AF37',
              color: '#0F0F10',
              fontWeight: 800,
              fontSize: 9
            }}
          >
            FEATURED
          </span>
        )}
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600&auto=format&fit=crop';
            }}
            style={{ width:'100%', height:'100%', objectFit:'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} 
            className="product-card-img" 
          />
        ) : (
          <span style={{ fontSize:48 }}>🛍️</span>
        )}
      </div>
      <div style={{ padding:28, flex:1, display:'flex', flexDirection:'column' }}>
        <span className="badge badge-muted" style={{ marginBottom:14, alignSelf:'flex-start', fontSize:10 }}>{product.category.replace('-', ' ').toUpperCase()}</span>
        <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:17, color:'#EAE1D4', margin:'0 0 10px 0', letterSpacing:'-0.01em', lineHeight:1.3 }}>{product.name}</h3>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#A1A1A1', lineHeight:1.6, margin:'0 0 24px 0', flex:1 }}>{product.shortDescription || product.shortDesc}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid #2A2A2D', paddingTop:16, marginTop:'auto' }}>
          <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'#D4AF37', letterSpacing:'0.05em' }}>MOQ: {product.minimumOrderQuantity || 50} PCS</span>
          <span style={{ fontFamily:'Montserrat,sans-serif', fontSize:11, fontWeight:700, color:'#A1A1A1', display:'flex', alignItems:'center', gap:4 }}>SPECIFICATIONS <ArrowRight size={12}/></span>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [search, setSearch]             = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const ref = useStaggerReveal();
  const heroRef = useStaggerReveal();

  useEffect(() => { document.title = 'Products Catalog | Tawan Impex — Sportswear OEM/ODM'; }, []);
  useEffect(() => { setActiveCategory(searchParams.get('cat') || 'all'); }, [searchParams]);

  // Fetch real categories from backend with react-query
  const { data: dbCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll().then(res => res.data.data),
    staleTime: 0,
  });

  // Fetch real products from backend with react-query
  const { data: dbProducts = [], isLoading } = useQuery({
    queryKey: ['products', activeCategory, search],
    queryFn: () => productService.getAll({
      category: activeCategory !== 'all' ? activeCategory : undefined,
      search: search || undefined
    }).then(res => res.data.data),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleCatChange = (id) => {
    setActiveCategory(id);
    if (id === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', id);
    }
    setSearchParams(searchParams);
  };

  // Combine static and DB categories to avoid empty state if DB is unseeded
  const renderedCategories = dbCategories.length > 0 ? dbCategories : PRODUCT_CATEGORIES;

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
                <span className="section-label">B2B Manufacturing Catalog</span>
                <span className="gold-divider" style={{ margin:'12px 0 20px 0' }} />
              </div>
              <div className="reveal delay-100">
                <h1 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:800, fontSize:'clamp(32px,5vw,56px)', lineHeight:1.1, letterSpacing:'-0.019em', color:'#EAE1D4', margin:'0 0 20px 0' }}>
                  OEM & ODM Product Divisions
                </h1>
              </div>
              <div className="reveal delay-200">
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(16px,2vw,18px)', color:'#A1A1A1', maxWidth:580, lineHeight:1.7, margin:'0 0 40px 0' }}>
                  Explore our state-of-the-art product lines. Every design can be fully customized with bespoke fabrications, custom labeling, and tailored private-label branding.
                </p>
              </div>
              <div className="reveal delay-300" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <a href={WHATSAPP_URL()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 32px' }}>
                  <WhatsAppIcon size={16}/> INITIATE MANUFACTURING QUOTE
                </a>
              </div>
            </div>
            {/* Image Column */}
            <div className="hero-image-col reveal delay-200" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:'-20px', background:'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }} />
              <div className="hero-img-wrapper" style={{ position:'relative', borderRadius:20, border:'1px solid rgba(212,175,55,0.2)', padding:8, background:'rgba(27,27,29,0.5)', backdropFilter:'blur(10px)', width:'100%', maxWidth:540, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
                <img
                  src="/images/products_hero.png"
                  alt="Tawan Impex Sportswear Catalog"
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

      {/* Filters + Search */}
      <section style={{ background:'#121214', borderBottom:'1px solid #2A2A2D', position:'sticky', top:80, zIndex:100 }}>
        <div className="container-main" style={{ paddingBlock:20, display:'flex', alignItems:'center', gap:20, flexWrap:'wrap', justifyContent:'space-between' }}>
          {/* Search */}
          <div style={{ position:'relative', flex:'1 1 280px', maxWidth:400 }}>
            <Search size={16} style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'#A1A1A1' }} />
            <input
              type="search"
              placeholder="Search specifications or models…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field"
              style={{ paddingLeft:44, paddingBlock:12, background: '#0F0F10', border: '1px solid #2A2A2D' }}
            />
          </div>
          {/* Category filters */}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button
              onClick={() => handleCatChange('all')}
              style={{
                padding:'10px 20px', borderRadius:10, border:'1px solid',
                fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:12, letterSpacing:'0.04em', cursor:'pointer',
                background: activeCategory === 'all' ? '#D4AF37' : 'transparent',
                borderColor: activeCategory === 'all' ? '#D4AF37' : '#2A2A2D',
                color: activeCategory === 'all' ? '#0F0F10' : '#A1A1A1',
                transition:'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              All Products
            </button>
            {renderedCategories.map(cat => {
              const catId = cat.slug || cat.id;
              const isSelected = activeCategory === catId;
              return (
                <button
                  key={catId}
                  onClick={() => handleCatChange(catId)}
                  style={{
                    padding:'10px 20px', borderRadius:10, border:'1px solid',
                    fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:12, letterSpacing:'0.04em', cursor:'pointer',
                    background: isSelected ? '#D4AF37' : 'transparent',
                    borderColor: isSelected ? '#D4AF37' : '#2A2A2D',
                    color: isSelected ? '#0F0F10' : '#A1A1A1',
                    transition:'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-gap" style={{ background:'#0F0F10' }}>
        <div className="container-main" ref={ref}>
          {isLoading ? (
            <div style={{ textAlign:'center', padding:'120px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              <Loader className="animate-spin" size={36} style={{ color: '#D4AF37' }} />
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color:'#A1A1A1' }}>Querying factory catalog database...</p>
            </div>
          ) : dbProducts.length === 0 ? (
            <div style={{ textAlign:'center', padding:'120px 0' }}>
              <div style={{ fontSize:48, marginBottom:20 }}>🔍</div>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#A1A1A1', marginBottom:12 }}>No factory designs match your criteria.</p>
              <button onClick={() => { setSearch(''); handleCatChange('all'); }} style={{ textDecoration:'underline', background:'none', border:'none', color:'#D4AF37', cursor:'pointer', fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:13 }}>RESET FILTERS</button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 300px),1fr))', gap:32 }}>
              {dbProducts.map((p, i) => (
                <div key={p._id || p.id} className={`reveal delay-${(i%4)*100}`}>
                  <ProductCard product={p} onClick={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}

          {/* Mid CTA */}
          <div style={{ textAlign:'center', marginTop:80, padding:'60px 40px', background:'#121214', border:'1px solid #2A2A2D', borderRadius:20, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'100%', height:'100%', background:'radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 70%)', pointerEvents:'none' }} />
            <h3 style={{ fontFamily:'Montserrat,sans-serif', fontWeight:700, fontSize:24, color:'#EAE1D4', margin:'0 0 16px 0', letterSpacing:'-0.01em' }}>
              Custom Fabrication & Development
            </h3>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#A1A1A1', marginBottom:32, lineHeight:1.7, maxWidth:580, marginInline:'auto' }}>
              Have custom tech-packs, mockups, or proprietary fabrications? Our engineering team works directly from your drawing sheets to develop golden samples.
            </p>
            <a href={WHATSAPP_URL('Hi, I want to discuss a custom sportswear manufacturing order from my own designs.')} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding:'16px 36px' }}>
              <WhatsAppIcon size={16}/> INITIATE CUSTOM ODM DEVELOPMENT
            </a>
          </div>
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}
