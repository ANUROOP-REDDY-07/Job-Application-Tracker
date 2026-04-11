/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'black': '#090A0F',
        'white': '#ffffff',
        'surface': '#ffffff',
        'surface-flat': '#F8FAFC',
        'surface-glass': 'rgba(255, 255, 255, 0.7)',
        'primary-text': '#0F172A',
        'secondary-text': '#475569',
        'tertiary-text': '#94A3B8',
        'gray': '#64748B',
        'dark-gray': '#1E293B',
        'light-gray': '#E2E8F0',
        'green': '#059669',
        'green-light': '#D1FAE5',
        'teal': '#E11D48',         // Rose 600
        'teal-dark': '#BE123C',    // Rose 700
        'teal-light': '#FFE4E6',   // Rose 100
        'brand': '#F97316',        // Orange 500
        'brand-dark': '#C2410C',   // Orange 700
        'brand-light': '#FFEDD5',  // Orange 100
        'red': '#E11D48',
        'red-light': '#FFE4E6',
        'error': '#EF4444',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'mesh': "radial-gradient(at 0% 0%, hsla(17,80%,15%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(348,60%,20%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(45,80%,15%,1) 0, transparent 50%)",
        'glass-grad': 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))'
      }
    },
  },
  plugins: [],
}

