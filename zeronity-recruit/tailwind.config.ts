/**
 * Tailwind CSS v4 uses CSS-based configuration via @theme directive in globals.css.
 * Custom colors, fonts, and gradients are defined in app/globals.css.
 *
 * This file is kept for reference and compatibility.
 * Actual theme values:
 *
 * Colors:
 *   bg-primary: #0a0a0a
 *   bg-secondary: #111111
 *   accent-purple: #7a00df
 *   accent-red: #e8380d
 *   text-primary: #ffffff
 *   text-sub: rgba(255,255,255,0.5)
 *   text-label: rgba(255,255,255,0.4)
 *
 * Fonts:
 *   sans: Noto Sans JP, Inter
 *   heading: Inter, Noto Sans JP
 *
 * Gradients:
 *   gradient-accent: 90deg #7a00df -> #e8380d
 *   gradient-hero: 135deg #0a0a0a -> #1a0a2e -> #1a0508 -> #0a0a0a
 *   gradient-section: 135deg #1a0a2e -> #0a0a0a
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#111111",
        },
        accent: {
          purple: "#7a00df",
          red: "#e8380d",
        },
        text: {
          primary: "#ffffff",
          sub: "rgba(255, 255, 255, 0.5)",
          label: "rgba(255, 255, 255, 0.4)",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', "Inter", "sans-serif"],
        heading: ["Inter", '"Noto Sans JP"', "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(90deg, #7a00df, #e8380d)",
        "gradient-hero":
          "linear-gradient(135deg, #0a0a0a, #1a0a2e, #1a0508, #0a0a0a)",
        "gradient-section": "linear-gradient(135deg, #1a0a2e, #0a0a0a)",
      },
    },
  },
  plugins: [],
};

export default config;
