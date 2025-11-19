

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#123456', // Add a new color
        red: colors.red['500'], // Override a specific shade of a default color
      },
    },
  },


};
