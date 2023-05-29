/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'koverwatch': ['koverwatch','Cairo', 'sans-serif'],
        'oskari': ['OSKARI G2','Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          500: "#ED0033",
          600: "#D6002E",
          800: "#A40024",
          900: "#7A001B",
          'dark': "#68001E"
        },
        danger:{
          500: "#48350B",
        },
        success:{
          500: "#00FF92",
          600: "#00E887",
          700: "#00C97B",
          800:"#0C492F",
          900:"#0A3C25",
        },
        warn:{
          500:"#FFB000",
          600:"#E6A000",
          700:"#CC8F00",
          800:"#48350B",
          900:"#3C2C0A",
        },
        darkgray:{
          100:"#8A8B8D",
          200:"#757577",
          300:"#42444D",
          350:"#2F3035",
          400:"#232527",
          500: "#15171A",
          600: "#090A0D",
        },
        bluegray:{
          200:"#7E828B",
          300:"#5E616A",
          400:"#3D4049",
          500:"#1E2029",
          600:"#101318",
          700:"#1A1C21",
          900:"#0D0F12",
          "dark":"#14171C"
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
