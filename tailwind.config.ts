import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "lineat-gradient(to bottom, #000, #232323)",
      },
      colors: {
        deepslate: "#1c1c1e",
        inputbordercolor: "#6e6e73",
        inputbgcolor: "#242426",
        inputplaceholdercolor: "#7c7b80",
        onyx: "#232323",
        ash: "#919191",
        charcoal: "#161616",
        obsidian: "#282828",
        cinder: "#302e2c",
      },
      boxShadow: {
        shadow1: "0 11px 34px 0 rgba(0, 0, 0, 0.6)",
      },
      height: {
        "56": "3.5rem",
      },
      fontSize: {
        13: "13px",
        15: "15px",
        clamp1: "clamp(8vw, 10vw, 180px)",
      },
      animation: {
        fadeIn: "fadeIn 500ms ease-in-out forwards",
        gravity: "gravityBounce 2.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        gravityBounce: {
          "0%": { transform: "translateY(0)" },
          "20%": {
            transform: "translateY(15px)",
            "animation-timing-function": "ease-in",
          },
          "100%": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
          },
        },
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
      screens: {
        "400": "400px",
        "480": "480px",
        "820": "820px",
        "h-sm": { raw: "(max-height: 790px) and (min-width: 1024px)" },
      },
    },
  },
  plugins: [],
};
export default config;
