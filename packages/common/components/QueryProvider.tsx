"use client"

import { QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { ComponentProps } from "react"
import { getQueryClient } from "./getQueryClient"

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({ children, ...props }: Props) => {
  const client = getQueryClient()

  return (
    <QueryClientProvider {...props} client={client}>
      {children}
      {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
