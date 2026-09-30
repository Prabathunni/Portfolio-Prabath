import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        surface: "#0a0a0a",
        line: "rgba(255,255,255,0.12)",
        ink: "#e8e8e8",
        muted: "#8a8a8a",
        accent: "#cb2e07",
      },
      fontFamily: {
        display: ["var(--font-cairo)"],
        sans: ["var(--font-cairo)"],
      },
    },
  },
  plugins: [],
};

export default config;
