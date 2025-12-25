

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/js/**/*.js",
    "./resources/js/**/*.jsx",
    "./resources/js/**/*.ts",
    "./resources/js/**/*.tsx",
    "./resources/views/**/*.blade.php",
    "./node_modules/@heroui/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#123456',
      },
    },
  },
  plugins: [],
};
