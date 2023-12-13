/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cream: '#EAE8E4',
      darkgray: '#404040',
      ligthgray: '#E3E0D9',
      armygreen: {
        DEFAULT:'#5D7551',
        dark: '#506841'
      } ,
      mustard: '#C49F5F',
    }
    // extend: {},
  },
  plugins: []
}
