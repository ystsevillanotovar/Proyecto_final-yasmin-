/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/composables/**/*.{js,ts}',
    './src/plugins/**/*.{js,ts}',
    './src/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E74C3C',
        'primary-light': '#FF6B6B',
        'primary-dark': '#C0392B',
        accent: '#FF8C42',
        'accent-light': '#FFB347',
        warning: '#FFC857',
        danger: '#E74C3C',
        rose: '#FF6B8A',
        dark: '#FDF0E2',
        darker: '#3B1F12',
        surface: '#FFFFFF',
        'surface-hover': '#FFF5EB',
        'text-primary': '#2D1810',
        'text-muted': '#8B7355',
        'text-dim': '#B8A08A',
        border: 'rgba(139, 94, 60, 0.12)',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(231, 76, 60, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 66, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
