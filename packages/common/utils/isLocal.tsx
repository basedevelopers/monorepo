import { isServer } from "./isServer"

export const isLocal = () => {
  if (isServer()) {
    return (
      process.env.VERCEL_ENV === "development" ||
      process.env.NODE_ENV === "development"
    )
  }

  return globalThis.location.hostname === "localhost"
}
