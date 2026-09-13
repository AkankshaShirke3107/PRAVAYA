import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#D9DDE0",
        input: "#D9DDE0",
        ring: "#102F3E",
        background: "#F3F2EE",
        foreground: "#17202A",
        navy: {
          DEFAULT: "#102F3E",
          dark: "#082735",
          light: "#1B4965",
        },
        primary: {
          DEFAULT: "#102F3E",
          foreground: "#ffffff",
        },
        oil: {
          DEFAULT: "#C92925",
          dark: "#991F1B",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F3F2EE",
          foreground: "#17202A",
        },
        destructive: {
          DEFAULT: "#C92925",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F3F2EE",
          foreground: "#667085",
        },
        accent: {
          DEFAULT: "#F3F2EE",
          foreground: "#102F3E",
          red: "#C92925",
          darkRed: "#991F1B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#17202A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#17202A",
        },
        sidebar: {
          DEFAULT: "#FFFFFF",
          foreground: "#17202A",
          muted: "#F3F2EE",
          border: "#D9DDE0",
          accent: "#102F3E",
        },
        success: {
          DEFAULT: "#2E7D32",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#D97706",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#C92925",
          foreground: "#ffffff",
        },
        risk: {
          high: "#C92925",
          medium: "#D97706",
          low: "#2E7D32",
        },
        sif: {
          high: "#C92925",
          medium: "#D97706",
          low: "#2E7D32",
          none: "#64748b",
          blue: "#102F3E",
        },
        app: {
          bg: "#F3F2EE",
          card: "#FFFFFF",
          border: "#D9DDE0",
          heading: "#102F3E",
          body: "#17202A",
          small: "#667085",
          primary: "#102F3E",
          oil: "#C92925",
          success: "#2E7D32",
          warning: "#D97706",
          danger: "#C92925",
        }
      },
      transitionDuration: {
        '150': '150ms',
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        md: "2px",
        lg: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
