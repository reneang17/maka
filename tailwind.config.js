/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oaxaca-cream': '#F2F0E9',      /* Blanco hueso/Yeso */
        'oaxaca-clay': '#A65D43',       /* Terracota suave */
        'oaxaca-wood': '#5D4037',       /* Madera oscura */
        'oaxaca-sand': '#D7CCC8',       /* Arena */
        'oaxaca-text': '#2C2A29',       /* Carbón suave */
        'oaxaca-warm': '#F6E0B5',       /* Fondo cálido perfiles */
      },
      fontFamily: {
        serif: ['"Caveat"', 'cursive'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}
