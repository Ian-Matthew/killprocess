module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        brand: ["Rubik Mono One"],
      },

      keyframes: {
        "fade-in-and-out": {
          "0%": {
            transform: "translateY(-100%)",
          },
          "30%, 70%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      animation: {
        "fade-in-and-out": "fade-in-and-out 1s ease-in-out 0s forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
