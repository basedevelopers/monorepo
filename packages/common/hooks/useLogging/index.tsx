import { useEffect } from "react"
import { isLocal } from "../../utils/isLocal"
import { isServer } from "../../utils/isServer"
import { sendDiscordMessage } from "./sendDiscordMessage"
import { getInfo } from "./useInfo"

const DISCORD_WEBHOOK_URL = `https://discord.com/api/webhooks/1250464852678545418/C2anDcRV4E6mvV6liGktuiwZMM362-xarlRfQdLv_bS1aBOFuNcP6GhRTqrG12d3cTok`

type Params = {
  enable?: boolean
}

let enabled = false

export const sendLog = async (log?: string) => {
  if (!enabled) {
    return
  }

  const info = await getInfo()

  const {
    country,
    ip,
    location,
    longitude,
    latitude,
    typeEmoji,
    type = "",
    vendor = "",
    model = "",
    browser,
    os,
    isBot,
  } = info

  const { host } = window.location

  return sendDiscordMessage(DISCORD_WEBHOOK_URL, {
    avatar_url: `https://flagcdn.com/w320/${country.toLowerCase()}.webp`,
    username: `${ip} - ${host}`,
    content: `${
      log ? `${log}\n` : ""
    }📍 ${location}, (\`${latitude}\`, \`${longitude}\`) / ${typeEmoji} \`${type}\` \`${vendor}\` \`${model}\` - \`${browser}\` on \`${os}\` ${
      isBot ? "(🤖)" : ""
    }`,
  })
}

export function useLogging(parmas?: Params) {
  const { enable = !isLocal() } = parmas || {}

  useEffect(() => {
    if (isServer() || !enable) {
      return
    }

    enabled = true

    sendLog()
  }, [])

  return { sendLog }
}
