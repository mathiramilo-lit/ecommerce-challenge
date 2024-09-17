/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'techie-gray': {
          300: '#ABAEB7',
          600: '#5A5F70',
          900: '#1C202E',
        },
      },
    },
  },
  plugins: [],
};
