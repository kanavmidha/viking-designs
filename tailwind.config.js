/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './js/**/*.js',
    './src/**/*.css',
  ],
  theme: {
    extend: {
      colors:{
        'night': '#252525',
        'sage': '#CCC4A3',
        'grey': '#BCBCBC',
      },
      fontFamily:{
        sans: ["'Nunito Sans', sans-serif"],
        heading: ["'Rowdies', sans-serif"]
      }
    },
  },
  plugins: [],
}

