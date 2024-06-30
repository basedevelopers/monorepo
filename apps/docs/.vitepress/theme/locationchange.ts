const addLocationChangeEvent = () => {
  let prevURL = location.pathname
  const fireLocationChangeEvent = () => {
    window.dispatchEvent(new Event("locationchange"))
  }

  const oldPushState = history.pushState
  history.pushState = function pushState(...rest) {
    const ret = oldPushState.apply(this, rest)
    window.dispatchEvent(new Event("pushstate"))
    if (rest[2] !== prevURL) {
      window.dispatchEvent(new Event("locationchange"))
    }

    prevURL = rest[2] instanceof URL ? rest[2].pathname : (rest[2] as string)
    return ret
  }

  const oldReplaceState = history.replaceState
  history.replaceState = function replaceState(...rest) {
    prevURL = rest[2] instanceof URL ? rest[2].pathname : (rest[2] as string)
    window.removeEventListener("popstate", fireLocationChangeEvent)
    const ret = oldReplaceState.apply(this, rest)
    window.dispatchEvent(new Event("replacestate"))
    if (rest[2] !== prevURL) {
      window.dispatchEvent(new Event("locationchange"))
    }

    prevURL = rest[2] instanceof URL ? rest[2].pathname : (rest[2] as string)
    window.addEventListener("popstate", fireLocationChangeEvent)
    return ret
  }

  window.addEventListener("popstate", fireLocationChangeEvent)
}

addLocationChangeEvent()
