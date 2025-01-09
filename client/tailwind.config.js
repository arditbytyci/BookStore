/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "background-color": "#F0EEE2",
        "custom-text-color": "#36362E",
        "border-color": "#cac8bc",
      },
    },
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [require("daisyui")],
};
