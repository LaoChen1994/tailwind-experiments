module.exports = {
  purge: {
    mode: 'all',
    enable: true,
    content: ["./index.html", "./src/**/*.{js,jsx}", "./src/app.{js,jsx}"],
  },
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
