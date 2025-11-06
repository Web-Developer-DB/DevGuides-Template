import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#f1fa8c',
          200: '#ffb86c',
          300: '#ff79c6',
          400: '#bd93f9',
          500: '#8be9fd',
          600: '#50fa7b',
          700: '#6272a4',
          800: '#44475a',
          900: '#282a36',
        },
        dracula: {
          background: '#1f2029',
          surface: '#282a36',
          highlight: '#343746',
          border: '#414458',
          text: '#f8f8f2',
          muted: '#9aa3c4',
          cyan: '#8be9fd',
          green: '#50fa7b',
          orange: '#ffb86c',
          pink: '#ff79c6',
          purple: '#bd93f9',
          red: '#ff5555',
          yellow: '#f1fa8c',
        },
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top left, rgba(129, 140, 248, 0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.2), transparent 45%)',
      },
      boxShadow: {
        glow: '0 0 45px rgba(189, 147, 249, 0.45)',
      },
    },
  },
  plugins: [typography],
}
