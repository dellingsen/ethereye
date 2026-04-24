/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Slate palette (dark backgrounds)
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Emerald palette (neon accents)
        emerald: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
          950: "#052e16",
        },
      },
      backgroundColor: {
        cyberpunk: "#0f0f1e",
        "cyberpunk-dark": "#050510",
      },
      borderColor: {
        cyberpunk: "rgba(16, 216, 97, 0.3)",
      },
      boxShadow: {
        neon: "0 0 10px rgba(16, 216, 97, 0.5)",
        "neon-lg": "0 0 20px rgba(16, 216, 97, 0.8)",
        "neon-emerald": "0 0 20px rgba(34, 197, 94, 0.6)",
        "neon-emerald-lg": "0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4)",
        "neon-matrix": "0 0 10px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.1)",
        "neon-cyber": "0 0 15px rgba(16, 216, 97, 0.6), 0 0 30px rgba(16, 216, 97, 0.3)",
      },
      textShadow: {
        neon: "0 0 10px rgba(16, 216, 97, 0.8)",
        "neon-lg": "0 0 20px rgba(16, 216, 97, 1)",
      },
      backgroundImage: {
        "matrix-rain": "linear-gradient(180deg, rgba(0,255,0,0.1) 0%, transparent 100%)",
        "cyber-grid": "linear-gradient(rgba(16, 216, 97, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 216, 97, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "cyber-grid": "20px 20px",
      },
    },
    animation: {
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      glow: "glow 2s ease-in-out infinite",
    },
    keyframes: {
      glow: {
        "0%, 100%": {
          boxShadow:
            "0 0 10px rgba(16, 216, 97, 0.5), inset 0 0 10px rgba(16, 216, 97, 0.1)",
        },
        "50%": {
          boxShadow:
            "0 0 20px rgba(16, 216, 97, 0.8), inset 0 0 20px rgba(16, 216, 97, 0.2)",
        },
      },
    },
  },
};
plugins: []

