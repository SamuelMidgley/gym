/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#b4b8cd',
          200: '#8f94ab',
          300: '#6e7288',
          400: '#4d505f',
          500: '#40424f',
          600: '#393945',
          700: '#32323e',
          800: '#282833',
          900: '#1a1a21',
        },
        green: '#52e3c2',
      },
    },
  },
  plugins: [],
}
