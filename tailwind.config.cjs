/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    { pattern: /\[background-image:.*\]/ },
    { pattern: /\[background-size:.*\]/ },
    { pattern: /\[mask-image:.*\]/ },
    { pattern: /\[-webkit-mask-image:.*\]/ },
  ],
  theme: { extend: {} },
  plugins: [],
};
