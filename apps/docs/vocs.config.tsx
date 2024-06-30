import { defineConfig } from "vocs"

export default defineConfig({
  title: "Connect-less Payments",
  sidebar: [
    {
      text: "Introduction",
      link: "/introduction",
    },
    {
      text: "Installation",
      link: "/installation",
    },
    {
      text: "Getting Started",
      link: "/getting-started",
    },
  ],
  rootDir: ".",
  socials: [
    {
      icon: "github",
      link: "https://github.com/basedevelopers/monorepo",
    },
    {
      icon: "x",
      link: "https://twitter.com/wevm_dev",
    },
  ],
  head({ path }) {
    return (
      <>
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
      </>
    )
  },
  // logoUrl: `https://raw.githubusercontent.com/base-org/brand-kit/main/logo/in-product/Base_Network_Logo.svg`,
  // iconUrl: `https://raw.githubusercontent.com/base-org/brand-kit/main/logo/in-product/Base_Network_Logo.svg`,
})
