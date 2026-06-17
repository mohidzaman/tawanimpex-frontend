/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg':    '#0F0F10',
        'secondary-bg':  '#1B1B1D',
        'gold':          '#D4AF37',
        'gold-light':    '#F2CA50',
        'gold-dim':      '#E9C349',
        'red-accent':    '#D72638',
        'text-primary':  '#EAE1D4',
        'text-muted':    '#A1A1A1',
        'border-dark':   '#2A2A2D',
        'surface':       '#16130B',
        'surface-high':  '#2D2A21',
        'surface-highest':'#38342B',
        'outline':       '#99907C',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter:      ['Inter', 'sans-serif'],
      },
      fontSize: {
        'stat':   ['56px', { lineHeight: '1',   letterSpacing: '-0.03em', fontWeight: '800' }],
        'h1-d':   ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h1-m':   ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        'h2-d':   ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2-m':   ['26px', { lineHeight: '1.3', letterSpacing: '0',       fontWeight: '600' }],
        'body-d': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-m': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'btn':    ['14px', { lineHeight: '1',   letterSpacing: '0.05em',  fontWeight: '700' }],
      },
      borderRadius: {
        'sm':  '0.25rem',
        DEFAULT: '0.5rem',
        'md':  '0.75rem',
        'lg':  '1rem',
        'xl':  '1.5rem',
        'btn': '12px',
      },
      spacing: {
        'section':      '120px',
        'section-sm':   '80px',
        'nav':          '80px',
        'gutter':       '24px',
        'margin-d':     '80px',
        'margin-m':     '20px',
      },
      maxWidth: {
        'container': '1200px',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-left':  'fadeLeft 0.7s ease forwards',
        'fade-right': 'fadeRight 0.7s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'counter':    'counter 2s ease-out forwards',
        'spin-slow':  'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%':      { boxShadow: '0 0 0 16px rgba(212, 175, 55, 0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F2CA50 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0F0F10 0%, #1B1B1D 100%)',
      },
    },
  },
  plugins: [],
}
