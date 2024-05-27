/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F0F0F5",
        Bg: "#13163e",
        secondary: {
          DEFAULT: "#FF6600",
          100: "#f67d38",
          200: "#f48430",
        },
        black: {
          DEFAULT: "#000000",
          100: "#1F1E25",
          200: "#333333",
        },
        gray: {
          100: "#CDCDE0",
          200: "rgba(47,46,65,0.8)",
        },
        danger: {
          DEFAULT: "#f70e0d",
        },
        success: {
          DEFAULT: "#26b1a4",
        }
      },
    },
    fontFamily: {
      DNNextLTB: ["DINNextLT-Bold", "sans-serif"],
      DNNextLT: ["DINNextLT-Regular", "sans-serif"],
      DNNextLTL: ["DINNextLT-Light", "sans-serif"],
    },
  },
  plugins: [],
};
