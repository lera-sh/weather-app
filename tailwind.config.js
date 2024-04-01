/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000',
      white: '#ffffff33',
      red: '#FF0000',
      'gray-100': '#e7e7e7',
      'gray-400': '#888888',
      'gray-600': '#5a5a5a',
      'gray-800': '#454545',
      'gray-950': '#242424'
    },
    extend: {
      backgroundImage: {
        day: "url('/src/assets/clearDay.jpg')",
        night: "url('/src/assets/clearNight.jpg')",
        'morn-evn': "url('/src/assets/clearME.jpg')"
      },
      width: {
        160: '40rem'
      }
    }
  },
  plugins: []
}
