import { QueryProvider } from "@basedev/common/components/QueryProvider"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>
}
