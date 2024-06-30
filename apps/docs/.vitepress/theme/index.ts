import { config, sendLog } from "@basedev/common/hooks/useLogging"
import { isLocal } from "@basedev/common/utils/isLocal"
import { isServer } from "@basedev/common/utils/isServer"
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { h } from "vue"
import "./locationchange"

export default {
  extends: DefaultTheme,
  Layout() {
    config.enabled = !isLocal()

    if (config.enabled && !isServer()) {
      const { pathname } = globalThis.location
      window.addEventListener("locationchange", () => {
        const { pathname } = globalThis.location
        sendLog(pathname === "/" ? undefined : pathname)
      })
      sendLog(pathname === "/" ? undefined : pathname)
    }

    return h(DefaultTheme.Layout)
  },
} satisfies Theme
