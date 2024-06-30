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
      path: "./_fonts/Coinbase-Sans/Coinbase_Sans-Regular-web-1.32.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Coinbase-Sans/Coinbase_Sans-Medium-web-1.32.woff2",
      weight: "500 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cb-sans",
})

const CoinbaseMono = localFont({
  src: [
    {
      path: "./_fonts/Coinbase-Mono/Coinbase_Mono-Regular-web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Coinbase-Mono/Coinbase_Mono-Medium-web.woff2",
      weight: "500 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cb-mono",
})

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Connect-less Pay Demo"
  const description =
    "Simple and secure crypto payments, without connect wallet"

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
    <html
      lang="en"
      className={cn("violet", CoinbaseSans.variable, CoinbaseMono.variable)}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body className="h-dvh antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
