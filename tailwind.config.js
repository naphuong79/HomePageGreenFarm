/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        sliderBtn: '0 2px 10px rgba(54,54,54,0.15)',
      },
    },
  },
  plugins: [],
});
