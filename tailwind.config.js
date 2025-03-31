/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './app/**/*.{js,ts,jsx,tsx}', // if you’re using Next.js app dir
    ],
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
  };
  