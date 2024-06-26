export function closePopup(popup: Window | null) {
  if (popup && !popup.closed) {
    popup.close()
  }
}
