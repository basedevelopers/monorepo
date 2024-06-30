import { defineConfig } from "vitepress"

export default defineConfig({
  title: "Connect-less Payments",
  description: "Simple and secure crypto payments, without connect wallet",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/why" },
      { text: "Demo", link: "/demo" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Why Connect-less Payments?", link: "/why" },
          { text: "Installation", link: "/installation" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Demo", link: "/demo" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/basedevelopers/monorepo" },
      { icon: "x", link: "https://x.com/basedotdev" },
    ],
    search: {
      provider: "local",
    },
    editLink: {
      pattern:
        "https://github.com/basedevelopers/monorepo/edit/dev/apps/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present base.dev",
    },
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
