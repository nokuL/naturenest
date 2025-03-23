/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
        colors: {
          'forest': {
            DEFAULT: '#1F4D2C',
            light: '#2A6B3D',
            dark: '#173D23',
          },
          'mountain': {
            DEFAULT: '#67727E',
            light: '#8D99A6',
            dark: '#505A64',
          },
          'sky': {
            DEFAULT: '#5D9ECA',
            light: '#7FB3D9',
            dark: '#4A7FA3',
          }
        
      }
    },
  },
  plugins: [],
}

