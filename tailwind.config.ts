import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f5f0e7",
        paper: "#fffdf8",
        ink: "#14251f",
        muted: "#647069",
        line: "#d9d7cd",
        cobalt: "#2755c7",
        cobaltDark: "#183d99",
        clay: "#b95332",
        sun: "#e4a33b",
        mist: "#e8eee9",
        cream: "#efe3ce"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(25, 35, 29, 0.09)",
        lift: "0 12px 28px rgba(28, 42, 33, 0.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      fontFamily: {
        display: ["Newsreader Variable", "Newsreader", "Georgia", "serif"],
        sans: ["Manrope Variable", "Manrope", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
