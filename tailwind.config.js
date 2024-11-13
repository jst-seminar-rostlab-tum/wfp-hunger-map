/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme')

const config = {
  safelist: [
    'w-[215px]',
    'w-[179px]',
    'w-[636px]',
    'w-[500px]',
    'h-[657px]',
    'h-[600px]',
    'rounded-[12px_0_0_12px]',
    'max-w-[80%]',
    'max-w-[250px]',
    'max-w-[400px]',
    'pl-[215px]',
    'pl-[179px]',
    'z-[9999]',
  ],
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
      borderRadius: {
        '12px_0_0_12px': '12px 0 0 12px',
      },
      zIndex: {
        9999: '9999',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-hover': theme('colors.hover'),
          '--color-background': theme('colors.background'),
          '--color-active-countries': theme('colors.activeCountries'),
          '--color-inactive-countries': theme('colors.inactiveCountries'),
        },
      });
    },
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
            hover: '#005489',
            outlinedHover: '#E3F2FD',
            clickableSecondary: '#E6E6E6',
            danger: '#D32F2F',
            warning: '#FFB600',
            clusterGreen: '#85E77C',
            clusterOrange: '#FFB74D',
            clusterRed: '#FF5252',
            default: '#157DBC',
            chatbotFullscreen: '#d8d8d8',
            chatbotSidebar: '#71717a50',
            chatbotSidebarBtnHover: '#d9e1e9',
            chatbotInputArea: '#E6F1FE',
            chatbotDefaultPromptHover: '#D9E2EA',
            chatbotUserMsg: '#E6F1FE',
            chatbotDivider: '#292d32',
            surfaceGrey: '#B0B0B0',
            activeCountries: '#82bce0',
            inactiveCountries: '#a7b3ba',
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
            hover: '#0F6396',
            outlinedHover: '#0F6396',
            clickableSecondary: '#424242',
            danger: '#EF5350',
            warning: '#FFEB3B',
            clusterGreen: '#A3F39C',
            clusterOrange: '#FFB74D',
            clusterRed: '#FF5252',
            default: '#157DBC',
            chatbotFullscreen: '#292929',
            chatbotSidebar: '#40404050',
            chatbotSidebarBtnHover: '#848e98',
            chatbotInputArea: '#252529',
            chatbotDefaultPromptHover: '#848E98',
            chatbotUserMsg: '#26262A',
            chatbotDivider: '#556372',
            surfaceGrey: '#444444',
            activeCountries: '#115884',
            inactiveCountries: '#85929b',
          },
        },
      },
    }),
  ],
}

module.exports = config