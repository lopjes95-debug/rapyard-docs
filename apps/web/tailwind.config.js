/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yard: {
          coal: "#050509",
          steel: "#1b1f2a",
          ember: "#f97316",
          neon: "#22d3ee"
        }
      }
    }
  },
  plugins: []
};
