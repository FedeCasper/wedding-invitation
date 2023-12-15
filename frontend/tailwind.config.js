/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cream: '#EAE8E4',
      gray:{
        dark: '#404040',
        light: '#E3E0D9',
      } ,
      green: {
        DEFAULT:'#5D7551',
        dark: '#506841'
      } ,
      mustard: '#C49F5F',
      red: '#C44848',
      white: '#FFF',
    }
    // extend: {},
  },
  plugins: []
}
