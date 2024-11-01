import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'w-[215px]', 'w-3/4', 'w-[179px]', 'w-[636px]', 'w-[500px]',
    'h-[657px]', 'h-[600px]', 'bg-[#D9E2EA]', 'rounded-[12px_0_0_12px]',
    'max-w-[80%]', 'max-w-[250px]', 'max-w-[400px]'
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
        '80%': '80%',
        '250px': '250px',
        '400px': '400px',
      },
      height: {
        '657px': '657px',
        '600px': '600px',
      },
      borderRadius: {
        '12px_0_0_12px': '12px 0 0 12px',
        '12px': '12px',
      },
      colors: {
        'custom-gray': '#D9E2EA',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
