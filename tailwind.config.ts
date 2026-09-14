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
        // Core semantic tokens — reference CSS variables so .dark theme overrides work
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Static brand colors — these don't change with theme
        navy: {
          DEFAULT: "#102F3E",
          dark: "#082735",
          light: "#1B4965",
        },

        // Primary — uses CSS variable so dark theme gets teal variant
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Oil India red — static, same in both modes
        oil: {
          DEFAULT: "#C92925",
          dark: "#991F1B",
          foreground: "#ffffff",
        },

        // Semantic surface tokens — CSS variable for theme-awareness
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          // Static brand colors below remain as hex
          red: "#C92925",
          darkRed: "#991F1B",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          muted: "hsl(var(--sidebar-muted))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
        },

        // Status colors — static semantics, consistent across themes
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

        // App-level palette — kept as static hex for targeted use
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
