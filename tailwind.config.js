/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        deep: "#0a0f1a",
        mid: "#10213d",
        glow: "#2a6f7b",
        accent: "#f8b4d9",
        accent2: "#ff7ac6"
      },
      fontFamily: {
        display: ["'Frank Ruhl Libre'", "'Rubik'", "serif"],
        sans: ["'Rubik'", "'Segoe UI'", "sans-serif"]
      },
      boxShadow: {
        screen: "0 25px 60px rgba(6, 10, 24, 0.55)",
        glow: "inset 0 0 40px rgba(255, 255, 255, 0.05)",
        card: "inset 0 0 40px rgba(255, 255, 255, 0.08), 0 12px 30px rgba(6, 10, 24, 0.35)"
      },
      keyframes: {
        confettiFall: {
          "0%": { transform: "translate3d(0,0,0) rotate(var(--rotation))", opacity: "1" },
          "80%": { opacity: "0.95" },
          "100%": {
            transform: "translate3d(calc(var(--drift) * 1vw), 110vh, 0) rotate(calc(var(--rotation) + 280deg))",
            opacity: "0"
          }
        },
        confettiLayerFade: {
          "0%,70%": { opacity: "1" },
          "100%": { opacity: "0", visibility: "hidden" }
        }
      },
      animation: {
        confettiFall: "confettiFall var(--duration) ease-in forwards",
        confettiLayerFade: "confettiLayerFade 4.2s ease-in forwards"
      }
    }
  },
  plugins: []
};
