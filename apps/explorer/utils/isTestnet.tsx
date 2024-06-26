import { isServer } from "@basedev/common/utils/isServer"

export const isTestnet = () => {
  if (isServer()) {
    return false
  }

  return (
    globalThis.location.host.includes("testnet") ||
    new URLSearchParams(globalThis.location.search).get("testnet") === "true"
  )
}
