/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noche: '#060504',
        carbon: '#0E0C0A',
        grafito: '#17140F',
        oro: '#F2B138',
        brasa: '#FF8A1E',
        champagne: '#F6E7C8',
        celeste: '#74ACDF',
      },
      fontFamily: {
        display: ['"Unbounded Variable"', 'Unbounded', 'system-ui', 'sans-serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { mega: '0.35em' },
    },
  },
  plugins: [],
}
