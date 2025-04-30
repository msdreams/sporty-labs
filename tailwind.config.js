import { heroui } from "@heroui/react";
import { colorPallete } from "./colorPallete";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: ['animate-blur'],
  theme: {
   extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      colors: colorPallete,
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        sizeUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        'blur-animation': {
        '0%': {
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        },
        '50%': {
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        },
        '100%': {
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        },
      },
        
      },
      animation: {
        sizeUp: "sizeUp 0.8s ease-out",
        blur: 'blur-animation 3s ease-in-out forwards',
      },
      spacing: {
        pxClamp: "clamp(16px, 5vw, 68px)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: colorPallete,
        },
      },
    }),
  ],
}