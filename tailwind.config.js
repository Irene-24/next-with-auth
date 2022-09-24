/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-purple-1": "#f1e5f1",
        "app-purple-2": "#e6c4e7",
        "app-purple-3": "#AA7DAA",
        "app-purple-4": "#892E89",
        "app-purple-5": "#F6EDF6",
        "app-purple-6": "#BA95BA",
        "app-purple-7": "#FCF6FC",
        "app-purple-8": "#D5A1D7",
        "app-purple-9": "#A86AAA",
        "app-purple-10": "#B58EB8B2",
        "app-black": "#222222",
        "app-gray-1": "#F0F0F3",
        "app-gray-2": "#727272",
        "app-yellow": "#FEEA9D",
        "app-blue": "#1152FDBA",
        "app-green": "#77FF0D",
      },
    },
  },
  plugins: [],
};
