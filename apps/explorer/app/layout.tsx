import "@basedev/common/styles/globals.css"

import { Body } from "@/app/Body"
import { Html } from "@/app/Html"
import { cn } from "@basedev/common/lib/utils"
import { Providers } from "components/Providers"
import { HOST } from "constants/urls"
import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Base Payments Explorer"
  const description = ""

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
    <Html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <Providers>
        <Body>{children}</Body>
      </Providers>
    </Html>
  )
}
