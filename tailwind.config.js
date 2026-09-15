/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces chaudes
        porcelain: '#FAF7F2',
        ivory: '#F3EDE3',
        sand: '#E7DCCB',
        // Encre (sections sombres)
        ink: {
          DEFAULT: '#171119',
          soft: '#221A26',
          line: '#3A2F3D',
        },
        // Marque : magenta "vin"
        wine: {
          50: '#FBF1F5',
          100: '#F7E0EA',
          200: '#EFC2D5',
          300: '#E19AB9',
          400: '#CE6E96',
          500: '#B54772',
          600: '#A63263',
          700: '#8C2551',
          800: '#6E1C3F',
          900: '#4A1229',
        },
        // Or "étincelle"
        gold: {
          100: '#FAEED6',
          200: '#F3DCAE',
          300: '#EBC57F',
          400: '#E0AC55',
          500: '#D2913A',
          600: '#B0762A',
          700: '#8A5B20',
        },
        body: '#241B26',
        muted: '#6E6472',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.5rem',
        frame: '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(23,17,25,0.04), 0 10px 30px -14px rgba(23,17,25,0.14)',
        lift: '0 2px 6px rgba(23,17,25,0.06), 0 28px 56px -28px rgba(166,50,99,0.30)',
        glow: '0 0 0 1px rgba(166,50,99,0.16), 0 18px 44px -18px rgba(166,50,99,0.38)',
        'ink-card': '0 24px 60px -30px rgba(0,0,0,0.65)',
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(100deg, #A63263 0%, #C2497E 45%, #D2913A 110%)',
        'gold-grad': 'linear-gradient(100deg, #E0AC55, #F3DCAE)',
        'ink-grad': 'linear-gradient(160deg, #1D1520 0%, #171119 55%, #241326 100%)',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      // Opacités intermédiaires utilisées par le design system
      opacity: {
        6: '0.06',
        8: '0.08',
        12: '0.12',
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.85) rotate(0deg)' },
          '50%': { opacity: '0.9', transform: 'scale(1.12) rotate(12deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.4s ease-in-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        rise: 'riseIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
