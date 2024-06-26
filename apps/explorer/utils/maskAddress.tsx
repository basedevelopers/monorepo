import type { Hex } from "viem"

export const maskAddress = (address: Hex, len = 4) => {
  return `${address.slice(0, len + 2)}...${address.slice(-len)}`
}
