/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "drawer-color": "#ffdfc8",
        "custom-text-color": "#3b3d78",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #ffdfc8, #fff0e1)", // Custom gradient
        "custom-gradient-bg": "linear-gradient(to right, #e6d1d6, #d3b2b7)",
        "custom-gradient-1": "linear-gradient(to right, #e6d1d6, #d8a8a9)", // Light to slightly darker pink
        "custom-gradient-2": "linear-gradient(to right, #e6d1d6, #bba6a8)", // Light to darker pink
        "custom-gradient-3":
          "linear-gradient(to right, #e6d1d6, #d8a8a9, #d3b2b7)", // Smooth gradient
        "custom-gradient-4": "linear-gradient(to right, #f3d6d6, #d1a7a7)", // Light to darker pink
        "custom-gradient-5": "linear-gradient(to right, #e0c5e1, #d3b2b7)", // Light lavender to pink
      },
    },
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [require("daisyui")],
};
