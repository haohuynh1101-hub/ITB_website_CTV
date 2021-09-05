// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

const SIDEBAR_WIDTH = 224;
const SIDEBAR_COMPACT_WIDTH = 56; // ! Can't be changed

const HEADER_HEIGHT = 56;

const toPx = (n) => `${n}px`;
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
          400: '#f37f26', // Primary
          500: '#d9660c',
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

      height: {
        header: `var(--header-height, ${toPx(HEADER_HEIGHT)})`, // headerHeight
        content: `calc(100vh - var(--header-height, ${toPx(HEADER_HEIGHT)}))`,
      },

      width: {
        'screen-3/4': '75vw',
        'screen-1/2': '50vw',
        '1/10': '10%',

        sidebar: toPx(SIDEBAR_WIDTH),
        'sidebar-compact': toPx(SIDEBAR_COMPACT_WIDTH),
        'header-company': toPx(SIDEBAR_WIDTH),
        'header-company-name': toPx(SIDEBAR_WIDTH - 24 - 16), // sidebarWidth - (paddingLeft[16px] + logoWidth[24px])

        'sidebar-space-r': toPx(SIDEBAR_WIDTH + 16), // sidebarWidth + paddingRight[16px]
        'sidebar-space-r-compact': toPx(SIDEBAR_COMPACT_WIDTH + 16), // sidebarCompactWidth + paddingRight[16px]
      },

      padding: {
        sidebar: toPx(SIDEBAR_WIDTH), // paddingLeft: sidebarWidth
        'sidebar-compact': toPx(SIDEBAR_COMPACT_WIDTH), // paddingLeft: sidebarCompactWidth

        '6px': '6px',
      },

      inset: {
        notice: 'var(--notice-height, 0px)',
        header: `calc(var(--notice-height, 0px) + var(--header-height, ${toPx(
          HEADER_HEIGHT
        )}))`, // headerHeight
        sidebar: toPx(SIDEBAR_WIDTH), // sidebarWidth
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
