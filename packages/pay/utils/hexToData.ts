import { type Hex, hexToString } from "viem"

/**
 * hexToData is a function that converts a hex string to a JSON object.
 *
 * @param {Hex} hex - The hex string to convert.
 * @returns {any | null} The JSON object or null if the hex string does not contain a JSON object.
 */
export const hexToData = (hex: Hex): any | null => {
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
