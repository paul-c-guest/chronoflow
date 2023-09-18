/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bebas Neue'],
        label: ['Roboto'],
      },
      fontSize: {
        '6xl': ['112px'],
      },
    },
  },
  plugins: [],
}
