const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      "body": ['Poppins', ...defaultTheme.fontFamily.sans],
      "display": ['Kaisei HarunoUmi', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        primary: "#040826",
        textColorTitle: "#212B36",
        borderButtonColor: "#1C2256",
        textColorInfo:"#637381",
        textGray:"#919EAB",
        textBlack:"#212B36",
        blueFull:"#3361FF",
        bgCuadroAyudas:"#EBEFFF",
        blueClaro:"#7D8FB3"
      },
      spacing:{
        '250px':'250px',
        '40px':'40px',
        '215px':'215px',
        '15px':'15px',
        '20px':'20px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

