/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/SettingsPopover.svelte", "./src/components/settings/*.svelte"],
  important: ".bslp-tailwind", // Scope to .bslp-tailwind
  darkMode: ['class', ':is([bslp-dark] *)'],
  theme: {
    extend: {
      colors: {
        grape: {
          100: "#F0F0FC",
          600: "#625ae8",
        },
        dark: {
          900: "hsl(0, 0%, 7%)",
          800: "hsl(0, 0%, 11%)",
          700: "hsl(0, 0%, 13%)",
          600: "hsl(0, 0%, 15%)",
          500: "hsl(0, 0%, 17%)",
          400: "hsl(0, 0%, 18%)",
          300: "hsl(0, 0%, 20%)",
          200: "hsl(0, 0%, 21%)",
          100 :"hsl(0, 0%, 22%)"
        }
      },
    },
  },
  plugins: [],
};
