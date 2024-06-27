"use client"

import { useLogging } from "@basedev/common/hooks/useLogging"
import { cn } from "@basedev/common/lib/utils"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Main = ({ children }: Props) => {
  useLogging()

  return <main className={cn("mx-auto max-w-screen-sm")}>{children}</main>
}
