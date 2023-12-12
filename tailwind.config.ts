import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      colors: {
        // Defining a dark palette
        dark: {
          900: '#0a0a0a', // Very dark (almost black) background
          800: '#1a1a1a', // Darker gray for card backgrounds, etc.
          700: '#2a2a2a', // Lighter gray for components
          600: '#3a3a3a', // Still lighter, for subtle contrast
          500: '#4a4a4a', // Gray for hover states or accents
        },
        primary: {
          100: '#cce4ff', // Light primary (for backgrounds of selected items, etc.)
          200: '#99c9ff', // Lighter primary variant
          300: '#66adff', // Primary color variant
          400: '#338cff', // Slightly darker primary
          500: '#006cff', // Primary color (e.g., for buttons, links)
        },
        accent: {
          100: '#ffcccf', // Light accent color
          200: '#ff999f', // Accent color variant
          300: '#ff666f', // Accent color (for notifications, icons, etc.)
          400: '#ff333f', // Darker accent color
          500: '#ff000f', // Dark accent color
        },
        // You can also customize other color scales (like `gray`, `red`, `blue`, etc.) similarly
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
