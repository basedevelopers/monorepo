import { useLocalStorage } from "@uidotdev/usehooks"

export const COLOR_THEMES = [
  "blue",
  "orange",
  "green",
  "red",
  "yellow",
  "violet",
  "rose",
]

export const useColorTheme = () => {
  const [colorTheme, setColorTheme] = useLocalStorage("color-theme", "blue")

  const toggle = () => {
    const currentIndex = COLOR_THEMES.indexOf(colorTheme)
    const nextIndex = (currentIndex + 1) % COLOR_THEMES.length
    setColorTheme(COLOR_THEMES[nextIndex])
  }

  return {
    colorTheme,
    toggle,
  }
}
