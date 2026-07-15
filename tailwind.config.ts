import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Dynatech industrial palette
        carbon: {
          DEFAULT: "#0E1116", // near-black, page base
          900: "#0E1116",
          800: "#15191F",
          700: "#1D222A",
          600: "#2A2F36",
          500: "#3A4048",
        },
        steel: {
          DEFAULT: "#5B636E",
          400: "#7A8390",
          300: "#A0A8B4",
          200: "#C7CCD3",
          100: "#E4E7EB",
        },
        signal: {
          DEFAULT: "#E4002B", // safety red — Dynatech accent
          hover: "#C40024",
          soft: "#FEE7EB",
        },
        warning: {
          DEFAULT: "#F2C438", // hazard yellow — used sparingly
        },
        surface: {
          DEFAULT: "#F5F5F4",
          alt: "#FAFAF9",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Tighter, more editorial scale
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        techno: "0.14em", // for uppercase eyebrows and SKU labels
      },
      borderRadius: {
        // Industrial: minimal rounding
        none: "0",
        xs: "2px",
        sm: "3px",
        DEFAULT: "4px",
      },
      spacing: {
        "18": "4.5rem",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "fade-up": "fade-up 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.6s ease-in-out infinite",
        "blob": "blob 14s ease-in-out infinite",
        "trace": "trace 2.4s linear infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(24px, -18px) scale(1.06)" },
          "66%": { transform: "translate(-18px, 14px) scale(0.96)" },
        },
        trace: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
