/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['DM Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
        },
      },
      boxShadow: {
        high: 'var(--shadow-elevation-high)',
      },
    },
  },
  plugins: [],
};
