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
        primary: "#040826"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

