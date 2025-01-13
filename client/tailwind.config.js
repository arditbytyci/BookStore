/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "background-color": "#F0EEE2",
        "custom-text-color": "#36362E",
        "button-color": "#007561",
        "border-color": "#cac8bc",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #F8F6EA, #FDFCF7)",
        "login-gradient":
          "linear-gradient(to bottom, #6ed0de, #c3e5ff, #f4f6f0, #ffffed, #fdfbf7, #2f4858)",
        "login-gradient2":
          "linear-gradient(to right, #f0eee2, #cdd1c0, #a8b6a1, #819b87)",
      },
      clipPath: {
        arrow: "polygon(0 0,100% 0, 100% 85%, 50% 100%, 0 85%)",
      },
    },
  },
  daisyui: {
    themes: ["autumn"],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("tailwind-clip-path"),
  ],
};
