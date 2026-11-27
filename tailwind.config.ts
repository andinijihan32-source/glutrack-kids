import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turquoise: "#00B4A6",
          teal: "#008C82",
          green: "#4ADE80",
          pink: "#F43F5E",
          yellow: "#FACC15",
          purple: "#A855F7",
          blue: "#38BDF8",
          bg: "#EBF9FA",
        },
      },
      boxShadow: {
        playful: "0 8px 0 0 rgba(0, 140, 130, 0.14)",
        "playful-pink": "0 6px 0 0 #BE123C",
        "playful-teal": "0 6px 0 0 #0F766E",
      },
    },
  },
  plugins: [],
};
export default config;
