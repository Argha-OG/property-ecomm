/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9", // Deep Purple
        accent: "#D4AF37", // Metallic Golden
        surface: "rgba(248, 250, 252, 0.7)", // White/Ice Blue Tint with opacity
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
      },
    },
  },
  plugins: [],
}
