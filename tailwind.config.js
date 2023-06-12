/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E1E1E',
        'secondary': '#F1F1F1',
        'form-back': '#B2B2B2',
        'left-desktop-back': '#D9D9D94D',
      },
    },
  },
  plugins: [],
}

