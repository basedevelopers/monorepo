import config from "@basedev/common/tailwind.config"

export default {
  presets: [config],
  content: [
    "../../**/components/**/*.tsx",
    "./app/**/*.tsx",
    //
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
}
