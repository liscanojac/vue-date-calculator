/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#318760',
        'primary-mint': '#42b883',
        'light-mint': '#78cea8',
        'primary-blue': '#6185a8',
        'dark-blue': '#34495e',
      },
    },
  },
  plugins: [],
}
