"use client"

import { useColorTheme } from "@/app/_hooks/useColorTheme"
import { Main } from "@/components/Main"
import { cn } from "@basedev/common/lib/utils"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function Body({ children }: Props) {
  const { resolvedTheme } = useTheme()
  const { colorTheme } = useColorTheme()

  return (
    <body className={cn("h-dvh antialiased", colorTheme, resolvedTheme)}>
      <Main>{children}</Main>
    </body>
  )
}
