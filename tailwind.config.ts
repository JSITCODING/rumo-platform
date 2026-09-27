import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f5f0",
        ink: "#152019",
        muted: "#66706a",
        line: "#dfe2dc",
        cobalt: "#3158d7",
        cobaltDark: "#2345b4",
        mist: "#eef1ea",
        cream: "#f2ecdc"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(25, 35, 29, 0.09)",
        lift: "0 12px 28px rgba(28, 42, 33, 0.12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
