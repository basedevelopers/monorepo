import Script from "next/script"

type Props = {
  token: string
}

export function CFAnalytics({ token }: Props) {
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  )
}
