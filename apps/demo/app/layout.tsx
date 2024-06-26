import "@basedev/common/styles/globals.css"

import { cn } from "@basedev/common/lib/utils"
import { Providers } from "components/Providers"
import { HOST } from "constants/urls"
import type { Metadata } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

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

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Template"
  const description = "A Next.js template"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${HOST}`,
      siteName: title,
    },
  }
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn("blue dark", CoinbaseSans.variable)}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
