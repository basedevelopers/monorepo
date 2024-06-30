/*
 * Close the popup window
 *
 * @param popup - The popup window to close
 */
export function closePopup(popup: Window | null) {
  if (popup && !popup.closed) {
    popup.close()
  }
}
