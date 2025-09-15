/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'rp-blue': '#2B9AF3',
        'rp-dark': '#2f3640',
        'rp-yellow': '#f2c94c'
      }
    }
  },
  plugins: [],
}