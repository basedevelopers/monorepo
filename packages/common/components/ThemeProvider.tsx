import { ThemeProvider as Theme } from "next-themes"
import type { ComponentProps, PropsWithChildren } from "react"

type Props = PropsWithChildren & ComponentProps<typeof Theme>

export const ThemeProvider = ({ children, ...props }: Props) => {
  return (
    <Theme
      attribute="class"
      defaultTheme="system"
      enableColorScheme
      enableSystem
      // disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </Theme>
  )
}
