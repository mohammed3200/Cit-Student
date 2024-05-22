/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F0F0F5",
        secondary: {
          DEFAULT: "#FF6600",
          100: "#FF5E00",
          200: "#FF4C00",
        },
      },
      black: {
        DEFAULT: "#000000",
        100: "#1F1E25",
        200: "#333333",
      },
      gray: {
        100: "#CDCDE0",
      },
    },
    fontFamily: {
      DNNestLTB: ["DINNextLT-Bold", "sans-serif"],
      DNNestLT: ["DINNextLT-Regular", "sans-serif"],
      DNNestLTL: ["DINNextLT-Light", "sans-serif"],
    },
  },
  plugins: [],
};
