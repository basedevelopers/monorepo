const config = require("@basedev/common/tailwind.config")

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [config],
  content: [
    "../../**/components/**/*.tsx",
    "./docs/**/*.{html,md,mdx,tsx,js,jsx}",
    //
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
}
