/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': 'var(--primary-green)',
        'primary-mint': 'var(--primary-mint)',
        'light-mint': 'var(--light-mint)',
        'light-blue': 'var(--light-blue)',
        'primary-blue': 'var(--primary-blue)',
        'dark-blue': 'var(--dark-blue)',
        celadon: 'var(--celadon)',
        charcoal: 'var(--charcoal)',
      },
    },
  },
  plugins: [],
}
