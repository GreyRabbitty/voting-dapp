const _ = require('lodash');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a", "950": "#172554" },
        main: '#32445a',
        twitter: '#1da1f2',
        bordercolor: '#413f3f',
        react: '#61dbfb',
        tailwind: '#00b4b6',
        nodejs: '#83ba63',
        mongodb: '#4db33d',
        aws: '#ff9900'
      },
      spacing: {
        '15': '3.75rem'
      },
      zIndex: {
        '-1': '-1',
      },
      borderWidth: {
        '1': '1px'
      },
      fontFamily: {
        'body': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    },
  },
  variants: {
  },
  plugins: [
    plugin(function ({ addUtilities, theme, e }) {
      const calcUtilities = _.map(theme('spacing'), (value, key) => {
        return {
          [`.${e(`calc-h-full-${key}`)}`]: {
            height: `calc(100% - ${value})`
          },
          [`.${e(`calc-w-full-${key}`)}`]: {
            width: `calc(100% - ${value})`
          }
        }
      })

      addUtilities(calcUtilities, {
        variants: ['responsive', 'hover'],
      })
    })
  ],
}
