/** @type {import('tailwindcss').Config} */
const colors = import("tailwindcss/colors.js");
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        ...colors,
        appRed: "#fe6960",
        appOrange: "#febf97",
        appYellow: "#fefac2",
        appLightBlue: "#d2fdfe",
        appTeal: "#affbff",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
