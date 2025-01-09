/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "background-color": "#F0EEE2",
        "custom-text-color": "#36362E",
        "button-color": "#2F333C",
        "border-color": "#cac8bc",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #F8F6EA, #FDFCF7)",
      },
    },
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [require("daisyui")],
};
