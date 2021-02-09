module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        brand: ["Rubik Mono One"],
      },

      animation: {
        "fade-out-down": "fade-out-down 1s ease-out",
      },
      keyframes: {
        "fade-out-down": {
          "0%": {
            opacity: "1",
            // transform: "translate-y(0%)",
          },
          "100%": {
            opacity: "0",
            // transform: "translate-y(100%)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
