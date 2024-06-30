import { config, sendLog } from "@basedev/common/hooks/useLogging"
import { isLocal } from "@basedev/common/utils/isLocal"
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { h } from "vue"

export default {
  extends: DefaultTheme,
  Layout() {
    config.enabled = !isLocal()

    if (config.enabled) {
      const { pathname } = globalThis.location
      globalThis.addEventListener("locationchange", () => {
        const { pathname } = globalThis.location
        sendLog(pathname === "/" ? undefined : pathname)
      })
      sendLog(pathname === "/" ? undefined : pathname)
    }

    return h(DefaultTheme.Layout)
  },
} satisfies Theme
