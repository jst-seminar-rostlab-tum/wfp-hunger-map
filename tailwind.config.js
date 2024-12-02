/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');

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
    'pl-[320px]',
    'z-[9999]',
    'bg-conflictProtest',
    'bg-conflictRiot',
    'bg-conflictBattle',
    'bg-conflictCivil',
    'bg-conflictExplosion',
    'bg-conflictStrategic',
    'right-0',
    'border-hazardWarning',
    'border-hazardWatch',
    'border-hazarAdvisory',
    'border-hazardInformation',
    'border-hazardTermination',
    'text-hazardWarning',
    'text-hazardWatch',
    'text-hazarAdvisory',
    'text-hazardInformation',
    'text-hazardTermination',
    'bg-fatalityAlert',
    'bg-climateWetAlert',
    'bg-climateDryAlert',
  ],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domain/constant/dataSourceTables/dataSourceAccordionItems.tsx',
    './src/operations/tables/*.tsx',
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
        '0.5px': '0.5px',
      },
      padding: {
        '179px': '179px',
        '215px': '215px',
      },
      borderRadius: {
        '12px_0_0_12px': '12px 0 0 12px',
      },
      borderSize: {
        '0.5px': '0.5px',
      },
      zIndex: {
        9999: '9999',
        sidebarExpanded: '41',
        sidebarCollapsed: '40',
        sidebarFullScreen: '41',
        chatbotExpanded: '41',
        chatbotCollapsed: '40',
        chatbotFullScreen: '41',
        alertsMenu: '40',
        legend: '40',
        accordionsModalButton: '40',
        cookieConsent: '41',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
        opacityPulse: 'opacityPulse 1.5s infinite',
        pulsingAlert: 'pulsingAlert 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
        opacityPulse: {
          '0%, 100%': { 'fill-opacity': '1' },
          '50%': { 'fill-opacity': '0.5' },
        },
        pulsingAlert: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0,
          },
        },
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
            hover: '#005489',
            outlinedHover: '#E3F2FD',
            clickableSecondary: '#E6E6E6',
            danger: '#D32F2F',
            warning: '#FFB600',
            clusterGreen: '#85E77C',
            clusterOrange: '#FFB74D',
            clusterRed: '#FF5252',
            clusterBlue: '#157DBC',
            default: '#157DBC',
            chatbotFullscreen: '#d8d8d8',
            chatbotSidebar: '#71717a50',
            chatbotSidebarBtnHover: '#d9e1e9',
            chatbotInputArea: '#E6F1FE',
            chatbotDefaultPromptHover: '#D9E2EA',
            chatbotUserMsg: '#E6F1FE',
            chatbotDivider: '#292d32',
            surfaceGrey: '#B0B0B0',
            subscribeText: '#284366',
            conflictProtest: '#0d657de6',
            conflictRiot: '#c95200e6',
            conflictBattle: '#7d0631',
            conflictCivil: '#96badc',
            conflictExplosion: '#eaaf75',
            conflictStrategic: '#bec0c1',
            hazardWarning: '#FF464E',
            hazardWatch: '#FFDC38',
            hazarAdvisory: '#57D66F',
            hazardInformation: '#0098EB',
            hazardTermination: '#B4B5B7',

            //fcs gradient
            fcsGradient1: '#29563a',
            fcsGradient2: '#73b358',
            fcsGradient3: '#cbcc58',
            fcsGradient4: '#d5a137',
            fcsGradient5: '#eb5a26',
            fcsGradient6: '#d3130c',

            //ipc global + nutrition country gradient
            ipcGradient1: '#f6d1c1',
            ipcGradient2: '#fc9b7d',
            ipcGradient3: '#fb7453',
            ipcGradient4: '#f24634',
            ipcGradient5: '#d11f26',
            ipcGradient6: '#ae151b',
            ipcGradient7: '#710013',

            //vegetation gradient
            vegetationGradient1: '#B99260',
            vegetationGradient2: '#B95926',
            vegetationGradient3: '#A3731F',
            vegetationGradient4: '#524C22',
            vegetationGradient5: '#000000',
            vegetationGradient6: '#729E13',
            vegetationGradient7: '#22B72D',
            vegetationGradient8: '#7BCB83',
            vegetationGradient9: '#B1DBB5',

            //rainfall gradient
            rainfallGradient6: '#0F4343',
            rainfallGradient7: '#25777D',
            rainfallGradient8: '#3AB9D1',
            rainfallGradient9: '#4295D3',

            //nutrition points
            nutritionActual: '#FFB74D',
            nutritionPredicted: '#E3F2FD',
            nutritionNotAnalyzed: '#D2D1D1',

            countriesBase: '#fefeff',
            ocean: '#91cccb',
            fatalityAlert: '#742280',
            climateWetAlert: '#4295D3',
            climateDryAlert: '#B95926',
            ipcPhase1: '#d1fad1',
            ipcPhase2: '#fae834',
            ipcPhase3: '#e88519',
            ipcPhase4: '#cd1919',
            ipcPhase5: '#731919',
            chartsLegendBackground: '#F5F5F5',
            chartsXAxisLine: '#a6a6a6',
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
            clusterBlue: '#157DBC',
            default: '#157DBC',
            chatbotFullscreen: '#292929',
            chatbotSidebar: '#40404050',
            chatbotSidebarBtnHover: '#848e98',
            chatbotInputArea: '#252529',
            chatbotDefaultPromptHover: '#848E98',
            chatbotUserMsg: '#26262A',
            chatbotDivider: '#556372',
            surfaceGrey: '#444444',
            subscribeText: '#ffffff',
            conflictProtest: '#0d657de6',
            conflictRiot: '#c95200e6',
            conflictBattle: '#7d0631',
            conflictCivil: '#96badc',
            conflictExplosion: '#eaaf75',
            conflictStrategic: '#bec0c1',
            countriesBase: '#0e6397',
            ocean: '#111111',
            fatalityAlert: '#742280',
            climateWetAlert: '#4295D3',
            climateDryAlert: '#B95926',
            chartsLegendBackground: '#2a2a2a',
            chartsXAxisLine: '#757575',
            nutritionNotAnalyzed: '#A69F9F',
          },
        },
      },
    }),
    require('@tailwindcss/typography'),
  ],
};

module.exports = config;
