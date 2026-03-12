import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: { brand: '#C41E24' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        heading: ['1.5rem', { lineHeight: '1.2' }],
        body: ['1rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}

export default config
