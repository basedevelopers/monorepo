import { isServer } from "./isServer"

export const isDev = () => {
  if (isServer()) {
    return process.env.VERCEL_ENV === "preview"
  }

  return globalThis.location.hostname.includes("dev.base.dev")
}
