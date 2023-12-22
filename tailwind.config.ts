import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      
      
      
      
      
      colors: {
        
        dark: {
          900: '#0a0a0a', 
          800: '#1a1a1a', 
          700: '#2a2a2a', 
          600: '#3a3a3a', 
          500: '#4a4a4a', 
        },
        primary: {
          100: '#cce4ff', 
          200: '#99c9ff', 
          300: '#66adff', 
          400: '#338cff', 
          500: '#006cff', 
        },
        accent: {
          100: '#ffcccf', 
          200: '#ff999f', 
          300: '#ff666f', 
          400: '#ff333f', 
          500: '#ff000f', 
        },
        
      }
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), nextui()],
}
export default config
