// ==UserScript==
// @name        Coinbase Wallet
// @namespace   Violentmonkey Scripts
// @match       https://wallet.coinbase.com/send
// @grant       none
// @version     1.0
// @author      -
// ==/UserScript==

const $ = (sel) => document.querySelector(sel)

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getPropsKey = (dom) =>
  Object.keys(dom).filter((p) => p.startsWith("__reactProps"))[0]

const setCurrency = async (currency) => {
  if (currency === "USDC") return
  if (currency === "ETH") {
    await waitDom("[data-testid=switch-currency-pressable")
    $("[data-testid=switch-currency-pressable").click()
  }
}

const waitDom = async (selector) => {
  return new Promise((resolve) => {
    new MutationObserver((_, observer) => {
      if (selector) {
        if (document.querySelector(selector)) {
          observer.disconnect()
          resolve()
        }
      } else {
        observer.disconnect()
        resolve()
      }
    }).observe(document.body, { childList: true, subtree: true })
  })
}

const div = document.createElement("div")
div.style.position = "fixed"
div.style.top = "0"
div.style.left = "0"
div.style.width = "100vw"
div.style.height = "100vh"
div.style.backgroundColor = "black"
div.style.zIndex = "100000"

const blackOut = async (bool) => {
  if (bool) {
    document.body.appendChild(div)
  } else {
    document.body.removeChild(div)
  }
}

const setAmount = async (amount) => {
  const dom = $("[data-testid=amount-input]")

  const propsKey = getPropsKey(dom)

  await wait(10)

  dom[propsKey].onChange({ target: { value: amount } })
}

const setWallet = async (token, chainId) => {
  $(`[data-testid="primary-selector-cell-pressable"]`).click()

  await wait(0)

  $(`[data-testid="select-wallet-step"]`).children[1].children[0].style.height =
    "100dvh"

  await waitDom(".ReactVirtualized__Grid__innerScrollContainer")

  $(`[data-testid*="ETH/${token}/ETHEREUM_CHAIN:${chainId}/"]`).click()

  await waitDom("[data-testid=amount-input]")
}

const setTo = async (to) => {
  await waitDom("[data-testid=secondary-selector-cell-pressable]")

  $("[data-testid=secondary-selector-cell-pressable]").click()

  await wait(0)

  const searchDom = $("[data-testid=search-input]")

  const propsKey = getPropsKey(searchDom)

  searchDom[propsKey].onChange({ target: { value: to } })

  await waitDom("[data-testid=suggestion-item]")

  $("[data-testid=suggestion-item]").click()

  await waitDom("[data-testid=amount-input]")
}

blackOut(true)

const main = async () => {
  const search = new URLSearchParams(window.location.search)

  const to = search.get("to")
  const chainId = search.get("chainId")
  const currency = search.get("currency")
  const amount = search.get("amount")

  if (!to || !chainId || !currency || !amount) {
    alert("Invalid URL")
    return
  }

  window.history.replaceState({}, document.title, window.location.pathname)

  await setTo(to)
  await setWallet(currency, chainId)
  await setCurrency(currency)
  await setAmount(amount)

  blackOut(false)
}

window.addEventListener("load", main)
