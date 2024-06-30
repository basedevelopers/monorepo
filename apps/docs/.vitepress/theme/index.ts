import { config, sendLog } from "@basedev/common/hooks/useLogging"
import { isLocal } from "@basedev/common/utils/isLocal"
import { inject } from "@vercel/analytics"
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import { h } from "vue"

export default {
  extends: DefaultTheme,
  Layout() {
    config.enabled = !isLocal()

    inject({
      beforeSend: (e) => {
        const { pathname } = new URL(e.url)

        sendLog(pathname !== "/" ? pathname : undefined)

        return null
      },
    })

    return h(DefaultTheme.Layout)
  },
} satisfies Theme
