/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        sand: '#F6EBDD',
        beige: '#EADCCB',
        blush: '#F2D1CB',
        cocoa: '#5A3A2E',
        ink: '#171717',
        muted: '#5F5A55'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        site: '1200px'
      }
    }
  },
  plugins: []
}
