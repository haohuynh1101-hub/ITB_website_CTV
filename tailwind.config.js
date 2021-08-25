// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      inter: ['Inter'],
    },
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
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
    },
  },
  variants: {
    extend: {
      padding: ['first', 'important'],
      backgroundColor: ['checked', 'important', 'hover:important'],
      borderWidth: ['last', 'important'],
      borderColor: ['checked', 'important', 'hover:important'],
      zIndex: ['important'],
      width: ['important'],
      height: ['important'],
      minWidth: ['important'],
      maxWidth: ['important'],
      minHeight: ['important'],
      maxHeight: ['important'],
      flex: ['important'],
      flexDirection: ['important'],
      alignItems: ['important'],
      justifyContent: ['important'],
      textColor: ['important'],
      cursor: ['important'],
      display: ['hover', 'important'],
      fontSize: ['important'],
      outline: ['focus-visible'],
      borderRadius: ['important'],
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
      addVariant('hover:important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.hover\\:\\!${rule.selector.slice(1)}:hover`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
      addVariant('focus:important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.focus\\:\\!${rule.selector.slice(1)}:focus`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),
  ],
};
