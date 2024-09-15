/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#006400',
        'green-medium': '#008000',
        'green-light': '#66FF66',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}

