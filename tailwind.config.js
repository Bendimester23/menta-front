const withAnimations = require('animated-tailwindcss');

module.exports = withAnimations({
  purge: [],
  mode: 'jit',
  darkMode: `class`,
  theme: {
    extend: {
      keyfames: {
        notifpopup: {
          '0%': `transform: translate(0%, 150%)`,
          '100%': `transform: translate(0%, 0%)`
        }
      },
      animation: {
        notifpopup: 'notifpopup 500ms ease-in-out infinite',
      },
      spacing: {
        '150': `150%`
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
})
