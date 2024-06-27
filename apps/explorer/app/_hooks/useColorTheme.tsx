import { useState } from "react"

export const COLOR_THEMES = [
  "blue",
  "orange",
  "green",
  "red",
  "yellow",
  "violet",
  "rose",
]

const DEFAULT_COLOR_THEME = COLOR_THEMES[0]

export const useColorTheme = () => {
  const [colorTheme, setTheme] = useState(DEFAULT_COLOR_THEME)

  const toggle = () => {
    document.documentElement.classList.remove(...COLOR_THEMES)
    const newTheme =
      COLOR_THEMES[(COLOR_THEMES.indexOf(colorTheme) + 1) % COLOR_THEMES.length]
    setTheme(newTheme)
    document.documentElement.classList.add(newTheme)
  }

  console.log(colorTheme)

  return {
    colorTheme,
    toggle,
  }
}
