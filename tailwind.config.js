module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: ["fontprimary", "sans-serif"],
      primarybold: ["fontbold", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1234px",
    },
    extend: {
      colors: {
        blue: "#0B0149",
        yellow: "#F6E701",
        gray: "rgba(126, 121, 159, 0.5)",
        graylight: "#F0F0F4",
        gray2: "#7E799F",
        navactive: "rgba(126, 121, 159, 0.56)",
      },
      boxShadow: {
        1: "0px 4px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
}
