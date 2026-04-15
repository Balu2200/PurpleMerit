/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8fafc',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1f2937',
          800: '#111827',
          900: '#0f172a',
        },
        brand: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#14b8a6',
          600: '#0f766e',
          700: '#115e59',
        },
      },
      boxShadow: {
        glow: '0 20px 60px rgba(15, 23, 42, 0.16)',
      },
    },
  },
  plugins: [],
};
