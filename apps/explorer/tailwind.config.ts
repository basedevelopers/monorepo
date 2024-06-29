import config from "@basedev/common/tailwind.config"
import type { Config } from "tailwindcss"

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
} satisfies Config
