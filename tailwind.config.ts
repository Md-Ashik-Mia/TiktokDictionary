// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#90C0F8",
          mid: "#62A2EC",
          dark: "#00336E",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        // Placeholder for GRIFTER; when you add the real font, update this:
        display: ["system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
