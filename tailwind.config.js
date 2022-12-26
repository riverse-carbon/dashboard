/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['"DM Sans"', 'sans-serif'],
      serif: ['"Noto Serif"', 'serif'],
    },
    extend: {
      colors: {
        primary: {
          100: 'var(--clr-primary--100)',
          200: 'var(--clr-primary--200)',
          300: 'var(--clr-primary--300)',
          400: 'var(--clr-primary--400)',
          700: 'var(--clr-primary--700)',
          DEFAULT: 'var(--clr-primary--800)',
          900: 'var(--clr-primary--900)',
        },
        green: {
          400: 'var(--clr-green--400)',
          DEFAULT: 'var(--clr-green--700)',
        },
      },
      fontSize: {
        sm: ['var(--fs-300)', '1.5'],
        base: ['var(--fs-400)', '1.5'],
        xl: ['var(--fs-500)', '1.1'],
        '2xl': ['var(--fs-600)', '1.1'],
        '3xl': ['var(--fs-700)', '1.1'],
      },
      boxShadow: {
        low: 'var(--shadow-elevation-low)',
        medium: 'var(--shadow-elevation-medium)',
        high: 'var(--shadow-elevation-high)',
      },
    },
  },
  plugins: [],
};
