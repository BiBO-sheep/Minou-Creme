/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF6E5',
          soft: '#FBF7EC'
        },
        navy: '#041159',
        royal: {
          light: '#1A2BAF',
          DEFAULT: '#0C1C87',
          dark: '#081360'
        },
        cherry: {
          DEFAULT: '#930F1F',
          dark: '#7A0C19'
        },
        rose: '#936374'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      maxWidth: {
        site: '1200px'
      }
    }
  },
  plugins: []
}
