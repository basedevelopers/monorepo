import { cn } from "@basedev/common/lib/utils"
import localFont from "next/font/local"
import type { ReactNode } from "react"

const CoinbaseSans = localFont({
  src: [
    {
      path: "./CoinbaseSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./CoinbaseSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cb-sans",
})

type Props = {
  children: ReactNode
}

export function Html({ children }: Props) {
  return (
    <html lang="en" className={cn("scrollbar-hide", CoinbaseSans.variable)}>
      {children}
    </html>
  )
}
