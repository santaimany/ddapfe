/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  
  ],
  darkMode : 'class', 
  theme: {
    extend: {
      'ipad': '1024px', // For iPad Pro
        'iphone': '428px',
    },
  },
  plugins: [],
}

