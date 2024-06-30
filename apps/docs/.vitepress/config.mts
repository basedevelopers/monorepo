import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Connect-less Payments",
  description: "Simple and secure crypto payments, without connect wallet",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Why Connect-less Payments?", link: "/why" },
          { text: "Installation", link: "/installation" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/basedevelopers/monorepo" },
      { icon: "x", link: "https://x.com/basedotdev" },
    ],
  },
  cleanUrls: true,
  outDir: "./dist",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-icon-192x192.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
  ],
})
