/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: 'class', // Enable dark mode with 'class' mode
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
    },
  },
  plugins: [],
};
