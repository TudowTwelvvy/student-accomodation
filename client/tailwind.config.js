/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#003459",
        "pri-blue":"#007EA7",
        "sec-blue":"#00A8E8"
      }
    },
  },
  plugins: [],
}
