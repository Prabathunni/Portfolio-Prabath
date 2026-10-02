import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        surface: "#ffffff",
        line: "#000000",
        ink: "#000000",
        muted: "#000000",
        accent: "#000000",
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
