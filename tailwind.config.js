/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Next.js 페이지 디렉토리
    "./src/components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 디렉토리
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
