const POPUP_WIDTH = 420
const POPUP_HEIGHT = 700

/**
 * Open a popup window with the given URL.
 *
 * @param {string} url - The URL to open in the popup window.
 *
 * @returns {Window} The popup window.
 */
export function openPopup(url: string): Window {
  const left = (window.innerWidth - POPUP_WIDTH) / 2 + window.screenX
  const top = (window.innerHeight - POPUP_HEIGHT) / 2 + window.screenY

  const popup = window.open(
    url,
    "Smart Wallet - Popup",
    `width=${POPUP_WIDTH}, height=${POPUP_HEIGHT}, left=${left}, top=${top}`,
  )

  popup?.focus()

  if (!popup) {
    throw new Error("Popup blocked")
  }

  return popup
}
