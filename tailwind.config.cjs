/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/SettingsPopover.svelte", "./src/components/settings/*.svelte"],
  important: ".bslp-tailwind", // Scope to .bslp-tailwind
  theme: {
    extend: {
      colors: {
        grape: {
          100: "#F0F0FC",
          600: "#625ae8",
        },
      },
    },
  },
  plugins: [],
};
