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
        'ultra': ['Ultra', 'Montserrat']
      }
    },
  },
  plugins: [],
}

