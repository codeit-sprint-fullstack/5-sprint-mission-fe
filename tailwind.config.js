/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      width: {
        "90vw": "90vw",
      },
      fontFamily: {
        pre: ["Pretendard"],
      },
      colors: {
        bodyBg: "#ffffff",
        textMain: "#333",
      },
    },
  },
  plugins: [],
};
