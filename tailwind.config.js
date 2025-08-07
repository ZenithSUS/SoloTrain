/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        background: "#0A0A0A",
        primary: "#5A31D4",
        accent: "#3AA6F5",
        primtext: "#E0E0E0",
        subtext: "#9A9A9A",
        error: "#E63946",
        success: "#38B000",
        formbg: "#1A1A1A",
        formborder: "#2A2A2A",
      }
    },
  },
  plugins: [],
}