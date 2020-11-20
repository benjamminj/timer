/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

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
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "disabled"],
    borderColor: ["responsive", "hover", "focus", "disabled"],
    textColor: ["responsive", "hover", "focus", "disabled"],
    cursor: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("disabled", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`;
        });
      });
    }),
  ],
};
