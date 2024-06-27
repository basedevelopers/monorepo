import useLocalStorage from "@/hooks/useLocalStorage"

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
  const [colorTheme, setColorTheme] = useLocalStorage(
    "color-theme",
    DEFAULT_COLOR_THEME,
  )

  const toggle = () => {
    const currentIndex = COLOR_THEMES.indexOf(colorTheme ?? DEFAULT_COLOR_THEME)
    const nextIndex = (currentIndex + 1) % COLOR_THEMES.length
    setColorTheme(COLOR_THEMES[nextIndex])
  }

  return {
    colorTheme,
    toggle,
  }
}
