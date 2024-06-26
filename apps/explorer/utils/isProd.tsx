import { isServer } from "@basedev/common/utils/isServer"
import { HOST } from "constants/urls"

export const isProd = () => {
  if (isServer()) {
    return process.env.NODE_ENV === "production"
  }

  return globalThis.location.host === HOST
}
