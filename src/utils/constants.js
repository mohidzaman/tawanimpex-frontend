// src/utils/constants.js
export const SITE = {
  name:       'Tawan Impex',
  tagline:    'OEM • ODM • PRIVATE LABEL SOLUTIONS',
  description:'Industrial precision sportswear manufacturing for global brands.',
  phone:      '+92 337 612 3116',
  email:      'info@tawanimpex.com',
  whatsapp:   '923376123116',
  address:    'Sialkot 51310, Pakistan',
  instagram:  'https://instagram.com/tawanimpex',
  facebook:   'https://www.facebook.com/people/T-Awan-Impex/61567399471375/?mibextid=wwXIfr',
};

export const WHATSAPP_URL = (message = 'Hello, I am interested in a quote for sportswear manufacturing.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV_LINKS = [
  { label: 'Home',          path: '/'              },
  { label: 'Products',      path: '/products'      },
  { label: 'Manufacturing', path: '/manufacturing'  },
  { label: 'About',         path: '/about'          },
  { label: 'Contact',       path: '/contact'        },
];

export const STATS = [
  { value: 20,  suffix: '+',  label: 'Global Clients'      },
  { value: 4,   suffix: '',   label: 'Years Experience'     },
  { value: 50,  suffix: 'K+', label: 'Units / Month'        },
  { value: 10,  suffix: '+',  label: 'Countries Exported'   },
];

// Slugs aligned with backend seeder (soccer-kits, basketball-uniforms, etc.)
export const PRODUCT_CATEGORIES = [
  { id: 'soccer-kits',          name: 'Soccer Kits',         desc: 'Jerseys • Shorts • Tracksuits',       icon: '⚽' },
  { id: 'basketball-uniforms',  name: 'Basketball Uniforms',  desc: 'Jerseys • Shorts • Warm-ups',          icon: '🏀' },
  { id: 'tracksuits',           name: 'Tracksuits',           desc: 'Tech-Fleece • Hoodies • Joggers',      icon: '🏃' },
  { id: 'fitness-apparel',      name: 'Fitness Apparel',      desc: 'Compression • Yoga • Training Wear',   icon: '💪' },
  { id: 'teamwear',             name: 'Teamwear',             desc: 'Custom Kits • Club Sets • Fan Gear',   icon: '🏆' },
  { id: 'custom-odm',           name: 'Custom ODM',           desc: 'Your Design • Our Precision',          icon: '✏️' },
];

export const MANUFACTURING_STEPS = [
  { step: '01', title: 'Consultation',       desc: 'Detailed analysis of your brand specifications, material requirements, and design goals.' },
  { step: '02', title: 'Prototyping',        desc: 'Rapid sample development to finalize fit, fabric performance, and aesthetic integrity.' },
  { step: '03', title: 'Material Sourcing',  desc: 'Procuring premium technical textiles from our audited global supply chain network.' },
  { step: '04', title: 'Mass Production',    desc: 'Industrial-scale manufacturing using state-of-the-art automated machinery and skilled labor.' },
  { step: '05', title: 'Quality Control',    desc: 'Rigorous 100% inspection protocols ensuring every piece meets export-grade standards.' },
  { step: '06', title: 'Global Logistics',   desc: 'Secure packaging and streamlined shipping to your distribution centers worldwide.' },
];

export const WHY_CHOOSE = [
  { title: 'OEM Expertise',         desc: 'Complete original equipment manufacturing with your brand labels, tags, and custom packaging.' },
  { title: 'ODM Innovation',        desc: 'Full design-to-production service. Bring your concept; we handle everything else.' },
  { title: 'Quality Assurance',     desc: '100% in-house QC with international export-grade standards on every single unit.' },
  { title: 'Competitive MOQ',       desc: 'Minimum orders starting from 50 units per design, perfect for growing brands.' },
  { title: 'Fast Turnaround',       desc: 'Sampling within 7–10 days. Production runs delivered in 30–45 days.' },
  { title: 'Global Shipping',       desc: 'FOB, CIF, DDP terms available. We handle customs documentation and compliance.' },
];

export const EXPORT_REGIONS = [
  { region: 'Europe',        countries: ['UK', 'Germany', 'Netherlands', 'Italy'],                                 percentage: 35 },
  { region: 'Americas',      countries: ['USA', 'Canada'],                                                          percentage: 25 },
  { region: 'Middle East',   countries: ['UAE', 'Saudi Arabia'],                                                     percentage: 25 },
  { region: 'Asia Pacific',  countries: ['Australia', 'Malaysia'],                                                   percentage: 15 },
];

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
