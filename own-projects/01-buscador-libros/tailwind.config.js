/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fit-1': 'repeat(auto-fit, minmax(200px, 1fr))',
        sidebar: 'minmax(150px, 25%) 1fr'
      }
    }
  }
}
