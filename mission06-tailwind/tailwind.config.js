/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";
import children from "tailwindcss-children";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: { max: "744px" },
        // 744px 이하

        tb: { max: "1200px" },
        // 1200px 이하
      },
    },
  },
  plugins: [forms, aspectRatio, typography, children],
};
