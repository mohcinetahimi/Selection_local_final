const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Add only the necessary customizations here
      colors: {
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [require('daisyui')],
};
