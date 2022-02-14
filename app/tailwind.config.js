module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'container': 'clamp(0px, 80vw, 1024px)',
      },
      height: {
        'header': 'var(--header-height)',
        'footer': 'var(--footer-height)',
        'main': 'calc(100vh - var(--header-height) - var(--footer-height))',
      },
    },
  },
  plugins: [],
}
