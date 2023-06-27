/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial']

      }
    },
    colors: {
      'white': '#ffffff',
      'frozen-sky': '#00aeef',
      'blue_elis': '#E7F8FF',
    },
  },
  plugins: [],
}

