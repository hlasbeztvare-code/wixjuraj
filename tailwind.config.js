/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beliansky: {
          purple: "#9E3FFD",
          navy: "#16163F",
          grey: "#73738C",
          surface: "#F8F0FF",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
