import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'w-[215px]', 'w-[179px]', 'w-[636px]', 'w-[500px]',
    'h-[657px]', 'h-[600px]', 'rounded-[12px_0_0_12px]',
    'max-w-[80%]', 'max-w-[250px]', 'max-w-[400px]', 'pl-[215px]', 'pl-[179px]', 'z-[9999]',
    'mb-[16px]', 'mb-3', 'mb-4', 'border-black', 'border-white'
  ],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      width: {
        '215px': '215px',
        '179px': '179px',
        '636px': '636px',
        '500px': '500px',
        '250px': '250px',
        '400px': '400px',
        '80%': '80%',
      },
      height: {
        '657px': '657px',
        '600px': '600px',
      },
      padding: {
        '179px': '179px',
        '215px': '215px',
      },
      margin: {
        '16px': '16px',
      },
      borderRadius: {
        '12px_0_0_12px': '12px 0 0 12px',
      },
      zIndex: {
        '9999': '9999',
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
            secondary: '#EEEEEE',
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
            chat: '#e6f1fe'
          },
        },
        dark: {
          colors: {
            primary: '#157DBC',
            secondary: '#424242',
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
          },
        },
      },
    }),
  ],
};
