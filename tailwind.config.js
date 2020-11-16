module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      inset: {
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
      },
      colors: {
        "accent-1": "#333",
      },
    },
  },
  // TODO: look into disabled pseudoclass on border colors
  variants: {},
  plugins: [],
};
