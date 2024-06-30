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
})
