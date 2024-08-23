// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#040711', // Deep Space
        'steel-gray': '#394150', // Steel Gray
        'slate-blue': '#4D5562', // Slate Blue
        'light-gray': '#CDD5E0', // Light Gray
        'off-white': '#F9FAFB', // Off White
        'royal-blue': '#3662E3', // Royal Blue
        'sky-blue': '#7CA9F3', // Sky Blue
        'charcoal-80': '#212936cc', // Charcoal (80% opacity)
        'midnight-80': '#121826cc', // Midnight (80% opacity)
      },
      fontFamily: {
        sans: ['DM Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
