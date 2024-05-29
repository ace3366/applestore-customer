/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        encode: ["Encode Sans Expanded", "sans-serif "],
      },
      screens: {
        mp: "500px",
        sp: "360px",
      },
    },
  },
  plugins: [],
};
