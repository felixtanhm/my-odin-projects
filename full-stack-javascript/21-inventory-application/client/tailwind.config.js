/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        normal: "#A8A878",
        bug: "#A8B820",
        flying: "#A890F0",
        ground: "#E0C068",
        rock: "#B8A038",
        steel: "#B8B8D0",
        ghost: "#705898",
        ice: "#98D8D8",
        fairy: "#F0B6BC",
        poison: "#A040A0",
        psychic: "#F8588",
        dark: "#705848",
        fighting: "#C03028",
        dragon: "#7038F8",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
