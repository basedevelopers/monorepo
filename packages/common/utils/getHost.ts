import { isDev } from "./isDev"
import { isLocal } from "./isLocal"
import { isProd } from "./isProd"
import { isServer } from "./isServer"

export const getHost = () =>
  ({
    DEMO: {
      ["local"]: "http://localhost:7090",
      ["dev"]: `https://demo.dev.base.dev`,
      ["production"]: "https://demo.base.dev",
    }[getEnv()],

    EXPLORER: {
      ["local"]: "http://localhost:7091",
      ["dev"]: `https://explorer.dev.base.dev`,
      ["production"]: "https://explorer.base.dev",
    }[getEnv()],

    EXPLORER_TESTNET: {
      ["local"]: "http://localhost:7091",
      ["dev"]: `https://explorer.testnet.dev.base.dev`,
      ["production"]: "https://explorer.testnet.base.dev",
    }[getEnv()],

    DOCS: {
      ["local"]: "http://localhost:7092",
      ["dev"]: `https://docs.dev.base.dev`,
      ["production"]: "https://docs.base.dev",
    }[getEnv()],
  }) as const

export const getEnv = () => {
  if (isLocal()) return "local"

  if (isServer()) {
    if (isProd()) return "production"
    if (isDev()) return "dev"
  } else {
    if (globalThis.location.hostname.includes("dev.base.dev")) return "dev"
    if (globalThis.location.hostname.includes("base.dev")) return "production"
  }

  throw new Error("Unknown environment")
}
