---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Connect-less Payments"
  text: "on Base network"
  tagline: Simple and secure crypto payments,<br/>without connect wallet
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Why?
      link: /why
    - theme: alt
      text: GitHub
      link: https://github.com/basedevelopers/monorepo/tree/main/packages/pay
  image:
    alt:

features:
  - icon:
      src: https://em-content.zobj.net/source/microsoft/379/high-voltage_26a1.png
    title: Lightweight
    details: Tiny bundle size, tree-shakable and minimal API surface.
  - icon:
      src: https://em-content.zobj.net/source/microsoft/379/shield_1f6e1-fe0f.png
    title: TypeScript Ready
    details: Written in TypeScript with predictable static types.
  - icon:
      src: https://em-content.zobj.net/source/microsoft/379/rocket_1f680.png
    title: Connect-less Pay
    details: secure crypto payments without connect wallet.
  - icon:
      src: https://em-content.zobj.net/source/microsoft/379/heavy-dollar-sign_1f4b2.png
    title: Support USDC & ETH
    details: Support USDC and ETH payments.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #6B26D9 30%, #06b6d4);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #6B26D9 50%, #06b6d4 50%);
  --vp-home-hero-image-filter: blur(44px);
  --vp-c-brand-1: hsl(263.4, 70%, 60.4%);
  --vp-c-brand-2: hsl(263.4, 70%, 55.4%);
  --vp-c-brand-3: hsl(263.4, 70%, 50.4%);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
