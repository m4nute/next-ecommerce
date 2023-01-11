/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        '222': '#222',
        '333': '#333',
        '888': '#888',
        '111': '#111',
        '444': '#444',
        '999': '#999',
        'nav': '#fbf7f5',
      },
      spacing: {
        'nav': '84px'
      }
    },
  },
  plugins: [],
}