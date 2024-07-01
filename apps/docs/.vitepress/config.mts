import { defineConfig } from "vitepress"

export default defineConfig({
  title: "Connect-less Payments",
  description: "Simple and secure crypto payments, without connect wallet",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/why" },
      { text: "Example", link: "https://demo.base.dev" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Why Connect-less Payments?", link: "/why" },
          { text: "Installation", link: "/installation" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Demo", link: "/video-demo" },
          { text: "Example", link: "https://demo.base.dev" },
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
      "script",
      {
        defer: "",
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "f1743b3bc38741a1a2bd8aef872dedee"}',
      },
    ],
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

    // <meta property="og:title" content="Connect-less Payments">
    // <meta property="og:description" content="Simple and secure crypto payments, without connect wallet">
    // <meta property="og:url" content="https://docs.base.dev">
    // <meta property="og:site_name" content="Connect-less Payments">
    // <meta property="og:image" content="https://docs.base.dev/og.jpeg">
    // <meta property="og:image:alt" content="Connect-less Payments">
    // <meta property="og:image:type" content="image/jpeg">
    // <meta property="og:image:width" content="1200">
    // <meta property="og:image:height" content="600">
    // <meta name="twitter:card" content="summary_large_image">
    // <meta name="twitter:title" content="Connect-less Payments">
    // <meta name="twitter:description" content="Simple and secure crypto payments, without connect wallet">
    // <meta name="twitter:image" content="https://docs.base.dev/og.jpeg">
    // <meta name="twitter:image:alt" content="Connect-less Payments">
    // <meta name="twitter:image:type" content="image/jpeg">
    // <meta name="twitter:image:width" content="1200">
    // <meta name="twitter:image:height" content="600">

    [
      "meta",
      {
        property: "og:title",
        content: "Connect-less Payments",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Simple and secure crypto payments, without connect wallet",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://docs.base.dev",
      },
    ],
    [
      "meta",
      {
        property: "og:site_name",
        content: "Connect-less Payments",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://docs.base.dev/og.jpeg",
      },
    ],
    [
      "meta",
      {
        property: "og:image:alt",
        content: "Connect-less Payments",
      },
    ],
    [
      "meta",
      {
        property: "og:image:type",
        content: "image/jpeg",
      },
    ],
    [
      "meta",
      {
        property: "og:image:width",
        content: "1200",
      },
    ],
    [
      "meta",
      {
        property: "og:image:height",
        content: "600",
      },
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    [
      "meta",
      {
        name: "twitter:title",
        content: "Connect-less Payments",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Simple and secure crypto payments, without connect wallet",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://docs.base.dev/og.jpeg",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image:alt",
        content: "Connect-less Payments",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image:type",
        content: "image/jpeg",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image:width",
        content: "1200",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image:height",
        content: "600",
      },
    ],
  ],
})
