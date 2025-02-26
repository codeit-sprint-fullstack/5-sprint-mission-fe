import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "744px",
        xl: "1200px",
      },
      colors: {
        "primary-100": "#3692FF",
        "primary-200": "#1967D6",
        "primary-300": "#1251AA",
        "error-red": "#F74747",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
