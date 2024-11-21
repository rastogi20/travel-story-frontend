/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display:["poppins","sans-serif"],
    },
    extend: {
      colors: {
        "primary": "#101010",
        "secondary": "#F2F2F2",
        "tertiary": "#ffffff",
      },
      
    },
  },
  plugins: [],
}

