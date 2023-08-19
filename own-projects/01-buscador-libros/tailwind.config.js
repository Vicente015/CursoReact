/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [
    // véase https://stackoverflow.com/a/71795600
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-active', '& > *[data-active-item]')
      // addVariant('child-hover', '& > *:hover');
    }
  ],
  theme: {
    extend: {
      aria: {
        dai: 'data-active-item=""'
      },
      colors: {
        neutral: {
          150: '#f2f2f2',
          250: '#dbdbdb'
        }
      },
      gridTemplateColumns: {
        'fit-1': 'repeat(auto-fit, minmax(200px, 1fr))',
        sidebar: 'minmax(150px, 25%) 1fr'
      }
    }
  }
}
