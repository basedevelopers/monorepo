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
        <CFAnalytics token="0440ead22db24e74a1d86f2617cccd93" />
      </ThemeProvider>
    </QueryProvider>
  )
}
