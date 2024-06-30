/**
 * Close the popup window
 *
 * @param {Window | null} popup - The popup window to close
 *
 * @returns {void}
 */
export function closePopup(popup: Window | null) {
  if (popup && !popup.closed) {
    popup.close()
  }
}
