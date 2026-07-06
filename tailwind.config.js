/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#faf8f3",
          100: "#f5f0e6",
          200: "#ede4d0",
          300: "#e0d3b8",
        },
        forest: {
          50: "#eef3f0",
          100: "#d0dfd6",
          200: "#a1bfad",
          500: "#4a7c64",
          700: "#2d5a43",
          800: "#1e3d2d",
          900: "#152b1f",
        },
        amber: {
          500: "#c8622a",
          600: "#b55522",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.07)",
        "card-hover": "0 6px 28px 0 rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
