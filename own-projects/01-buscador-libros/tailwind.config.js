/* eslint-disable sort/object-properties */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
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
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        'bg-extra': 'var(--color-bg-extra)',

        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',

        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'accent-tertiary': 'var(--color-accent-tertiary)',
        error: 'var(--color-error)',

        text: {
          DEFAULT: 'var(--color-text-primary)'
        },

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
