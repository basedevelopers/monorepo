import "./index.css"

import { config, sendLog } from "@basedev/common/hooks/useLogging"
import { getUA } from "@basedev/common/hooks/useLogging/useUA"
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
      if (getUA().type === "desktop") {
        window.addEventListener("beforeunload", () => {
          sendLog("Close")
        })
      } else {
        window.addEventListener("pagehide", () => {
          sendLog("Close")
        })
      }
      sendLog(pathname === "/" ? undefined : pathname)
    }

    return h(DefaultTheme.Layout)
  },
} satisfies Theme
