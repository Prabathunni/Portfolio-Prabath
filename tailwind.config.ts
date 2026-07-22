import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0d1117",
        card: "#161b22",
        accentFrom: "#cb2e07",
        accentTo: "#feb47b",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(to right, #cb2e07, #feb47b)",
      },
    },
  },
  plugins: [],
};

export default config;
