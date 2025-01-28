/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}", "./index.css"],
  theme: {
    extend: {
      screens: {
        pc: "1200px",
        tablet: "744px",
        mobile: "375px",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#3692ff",
          200: "#1967d6",
          300: "#1251aa",
        },
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        error: {
          DEFAULT: "#f74747",
        },
      },
    },
  },
  plugins: [],
};
