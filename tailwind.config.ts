import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        pulse: 'pulse 1s ease-in-out'
      },
      keyframes: {
        pulse: {
          '0%': { 'box-shadow': '0 0 0 #0b6e4f90' },
          '75%': { 'box-shadow': '0 0 0 10px #0b6e4f60' },
          '100%': { 'box-shadow': '0 0 0 13px #0b6e4f30' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
export default config;
