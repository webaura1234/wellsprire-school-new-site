import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1116",
        paper: "#FAF8F4",
        accent: "#1C3B7E",
        gold: "#C8A15A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "serif"],
        sans: ["var(--font-body)", "Source Sans 3", "sans-serif"],
      },
      spacing: { gutter: "6vw", section: "10rem" },
      transitionTimingFunction: { editorial: "cubic-bezier(0.16,1,0.3,1)" },
    },
  },
};
export default config;
