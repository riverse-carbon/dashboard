/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      main: ['"DM Sans"', 'sans-serif'],
      serif: ['"Noto Serif"', 'sans-serif'],
    },
    fontSize: {
      sm: ['var(--fs-300)', '1.5'],
      base: ['var(--fs-400)', '1.5'],
      xl: ['var(--fs-500)', '1.1'],
      '2xl': ['var(--fs-600)', '1.1'],
      '3xl': ['var(--fs-700)', '1.1'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          100: 'var(--clr-primary--100)',
          300: 'var(--clr-primary--300)',
        },
        green: {
          DEFAULT: 'var(--clr-green--700)',
          400: 'var(--clr-green--400)',
        },
      },

      spacing: {
        sm: '0.625rem',
        md: '1.25rem',
        lg: '2.5rem',
      },
      margin: {
        lg: '3.75rem',
      },
      boxShadow: {
        medium: 'var(--shadow-elevation-medium)',
        high: 'var(--shadow-elevation-high)',
      },
      borderRadius: {
        sm: '.5rem',
        DEFAULT: '.75rem',
      },
    },
  },
  plugins: [],
};
