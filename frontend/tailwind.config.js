module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ightBlue: ' #F9FCFF',
        shadeOfBlack: ' #4C4C4C',
        tableWriting: '#636465',
        appBlue: '#0C77F8',
        statusRed: '#F25562',
        statusBlue: '#0C77F8',
        statusYellow: '#FFCE31',
        appTQ: '#30BFA3',
        completed: '#77D4A2',
        tableHeading: '#95A3C8',
        littleText: '#C0C0C0',
        circleBlue: '#C2F3D4',
        noDataText: '#BCC0C5',
        grayBorder: '#D8D8D8',
        inputBorder: '#E6E6EC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
