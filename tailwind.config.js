/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      fontSize: {
        '2xs': '0.6875rem',
        'xs': '0.75rem',
        'sm': '0.8125rem',
      }
    },
  },
};