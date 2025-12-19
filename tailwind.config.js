/** @type {import('tailwindcss').Config} */
module.exports = {
  // Point Tailwind at the Angular app sources so classes aren't purged away
  content: ['./apps/aleksapapovic/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
