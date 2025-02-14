/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        golden: '#fd7100',
        bg_main: '#141727',
        bgSoft: '#1A1D2C',
        textSoft: '#0284C7',
        semi_black: 'rgba(0, 0, 0, 0.463)',
      },
    },
  },
  plugins: [],
};
