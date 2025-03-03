/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-color-100": "#3692ff",
        "brand-color-200": "#1967D6",
        "brand-color-300": "#1251AA",
        "gray-900": "#111827",
        "gray-800": "#1F2937",
        "gray-700": "#374151",
        "gray-600": "#4B5563",
        "gray-500": "#6B7280",
        "gray-400": "#9CA3AF",
        "gray-200": "#E5E7EB",
        "gray-100": "#F3F4F6",
        "gray-50": "#F9FAFB",
        "error-color": "#F74747",
      },
    },
  },
  plugins: [],
};

export default config;
