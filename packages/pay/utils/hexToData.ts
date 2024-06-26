import { type Hex, hexToString } from "viem"

export const hexToData = (hex: Hex) => {
  const data = findJSONSubstring(hexToString(hex))

  if (!data) {
    return null
  }

  try {
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

function findJSONSubstring(input: string): string | null {
  const regex = /\{"domain"[^}]*\}\]}/
  const match = input.match(regex)
  return match ? match[0] : null
}
