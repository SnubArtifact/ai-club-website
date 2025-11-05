/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'system-ui', 'sans-serif'],
        'mont': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'ultra': ['Ultra', 'Montserrat'],
        'bitcount': ['Bitcount Grid Single', 'sans-serif'],
        'press': ['Press Start 2P', 'Ultra'],
        'tiny': ['Tiny5', 'sans-serif'],
        'nata': ['Nata Sans', 'sans-serif'],
        'young': ['Young Serif', 'serif'],
        'plex': ['IBM Plex Serif', 'serif'],
        'instrument': ['Instrument Serif', 'serif'],
        'archivo': ['Archivo Black', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

