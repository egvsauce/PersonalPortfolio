/** @type {import('tailwindcss').Config} */
module.exports = {
  // Keep class-based dark mode
  darkMode: "class",

  // v4: no `content` array needed anymore
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  // Plugins still work in v4 if/when you add them
  plugins: [],
};
