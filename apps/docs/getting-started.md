# Getting Started

:::warning
This library is **NOT** an official library of Coinbase.  
As it is under active development, the interface may change.
:::

Get started with connect-less payments in just a few lines of code.

## Overview

Connect-less Payments is a simple and secure crypto payment library that allows you to accept payments without connecting a wallet. It is built on the Base network and supports USDC and ETH payments.

- **Lightweight**: Tiny bundle size, tree-shakable and minimal API surface.
- **TypeScript Ready**: Written in TypeScript with predictable static types.
- **Connect-less Pay**: Secure crypto payments without connect wallet.
- **Support USDC & ETH**: Support USDC and ETH payments.

## Installation

:::code-group

```sh [npm]
npx jsr add @basedev/pay
```

```sh [pnpm]
pnpx jsr add @basedev/pay
```

```sh [yarn]
yarn dlx jsr add @basedev/pay
```

```sh [bun]
bunx jsr add @basedev/pay
```

:::

## Quick Start

Create a new instance of `BasePay` with the required options.

```ts
import { BasePay } from "@basedev/pay";

const Base = BasePay({
  testnet: true, // Use base sepolia testnet
  to: "0x...", // Recipient address
});
```

Use the `payment` method to create a payment request.

```ts
const { hash } = await Base.payment({
  currency: "USDC", // Currently, USDC and ETH are supported
  amount: 0.01,
  products: [
    {
      id: "product-id",
      name: "Product Name",
      image: "https://example.com/image.png",
    },
  ],
});
```

This will open the Coinbase Wallet Send page in a new popup window with all parameters filled in.

<img src="/getting-started-1.png" width="350" alt="Getting Started" />

<!-- ![](/getting-started-1.png) -->
