module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html",
    require.resolve("react-widgets/styles.css"),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("react-widgets-tailwind")],
}
