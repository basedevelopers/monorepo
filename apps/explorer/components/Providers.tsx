import { Main } from "@/components/Main"
import { CFAnalytics } from "@basedev/common/components/CFAnalytics"
import { QueryProvider } from "@basedev/common/components/QueryProvider"
import { ThemeProvider } from "@basedev/common/components/ThemeProvider"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Main>{children}</Main>
        <CFAnalytics token="eacb280e049a4e29be4e00a7eb41b29e" />
      </ThemeProvider>
    </QueryProvider>
  )
}
