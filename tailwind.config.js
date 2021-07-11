module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './core/**/*.{js,ts,jsx,tsx}',
    './hoc/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffefdd',
          100: '#ffd3b2',
          200: '#fab784',
          300: '#f79c55',
          400: '#FFC671', // Primary
          500: '#FCAD4E',
          600: '#aa4f07',
          700: '#7a3704',
          800: '#4a2100',
          900: '#1e0800',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
