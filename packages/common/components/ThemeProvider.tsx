import { ThemeProvider as Theme } from "next-themes"
import type { ComponentProps, PropsWithChildren } from "react"
import { Toaster } from "../components/ui/sonner"

type Props = PropsWithChildren & ComponentProps<typeof Theme>

export const ThemeProvider = ({ children, ...props }: Props) => {
  return (
    <Theme
      attribute="class"
      defaultTheme="system"
      enableColorScheme
      enableSystem
      {...props}
    >
      {children}
      <Toaster position="top-right" />
    </Theme>
  )
}
