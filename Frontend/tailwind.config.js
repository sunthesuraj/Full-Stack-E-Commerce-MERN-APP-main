/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primaryColor": "#7B22FA",
        "primaryColor-dark":"#5618AD",
        "secondaryColor":"#ffbf00",
        "secondaryColor-light" : "#ffc929",
        "headingColor" : "#181A1E",
        "textColor"  :"#4E545F",
        
        "primary-200" : "#ffbf00",
        "primary-100" : "#ffc929",
        "secondary-200" : "#00b050",
        "secondary-100" : "#0b1a78",
      }
    },
  },
  plugins: [],
}

