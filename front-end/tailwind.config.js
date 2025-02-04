/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"], // Default font for 'font-sans' class
        "sans-bold": ["Poppins_700Bold"], // Optional: if you need specific font variants
      },
    },
  },
  plugins: [],
};
