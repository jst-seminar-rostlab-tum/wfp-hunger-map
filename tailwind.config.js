import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        brand: '#157DBC',
        brandHover: '#0F6396',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: '#157DBC', foreground: '#F5F5F5' },
            secondary: '#666666',
            foreground: '#333333',
            background: '#F5F5F5',
            divider: '#157DBC',
            focus: '#157DBC',
            danger: '#D32F2F',
            warning: '#FFB600',
            clusterGreen: '#85E77C',
            clusterOrange: '#FFB74D',
            clusterRed: '#FF5252',
            default: '#157DBC',
            surfaceGrey: '#B0B0B0',
          },
        },
        dark: {
          colors: {
            primary: '#157DBC',
            secondary: '#B0B0B0',
            foreground: '#E0E0E0',
            background: '#121212',
            divider: '#157DBC',
            focus: '#157DBC',
            danger: '#EF5350',
            warning: '#FFEB3B',
            clusterGreen: '#A3F39C',
            clusterOrange: '#FFB74D',
            clusterRed: '#FF5252',
            default: '#157DBC',
            surfaceGrey: '#444444',
          },
        },
      },
    }),
  ],
};
