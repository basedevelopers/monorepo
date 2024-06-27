import { useEffect } from "react"
import { isServer } from "../../utils/isServer"
import { sendDiscordMessage } from "./sendDiscordMessage"
import { useInfo } from "./useInfo"

const DISCORD_WEBHOOK_URL = `https://discord.com/api/webhooks/1250464852678545418/C2anDcRV4E6mvV6liGktuiwZMM362-xarlRfQdLv_bS1aBOFuNcP6GhRTqrG12d3cTok`

type Params = {
  debug?: boolean
}

export function useLogging(parmas?: Params) {
  const { debug = false } = parmas || {}
  const { data: info } = useInfo()

  const sendLog = (log?: string) => {
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
    } = info!

    const { host } = window.location

    return sendDiscordMessage(DISCORD_WEBHOOK_URL, {
      avatar_url: `https://flagcdn.com/w320/${country.toLowerCase()}.webp`,
      username: `${ip} - ${host}`,
      content: `${
        log ? `${log} ` : ""
      }📍 ${location}, (${latitude}, ${longitude}) / ${typeEmoji} ${type} ${vendor} ${model} - ${browser} on ${os} ${
        isBot ? "(🤖)" : ""
      }`,
    })
  }

  useEffect(() => {
    if (isServer() || !info || !debug) {
      return
    }

    sendLog()
  }, [info])

  return { sendLog }
}
