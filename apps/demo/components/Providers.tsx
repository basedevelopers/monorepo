import { Main } from "@/components/Main"
import { QueryProvider } from "@basedev/common/components/QueryProvider"
import { ThemeProvider } from "@basedev/common/components/ThemeProvider"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Main>{children}</Main>
      </ThemeProvider>
    </QueryProvider>
  )
}
