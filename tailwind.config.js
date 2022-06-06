module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./UI/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    screens: {
      "2xl": { min: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { min: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { min: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { min: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { min: "639px" },
      xs: { min: "200px" },
      // => @media (max-width: 639px) { ... }
    },
  },
};
