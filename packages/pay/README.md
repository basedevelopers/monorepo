# BasePay

Simple and secure crypto payments, without connect wallet.

Learn more about BasePay at [base.dev](https://base.dev).

# Example

```sh
npx jsr add @basedev/pay
```

```ts
import { BasePay } from "@basedev/pay";

const Base = BasePay({
  testnet: true,
  to: "0x...",
});

const { hash } = await Base.payment({
  currency: "USDC", // 'USDC' or 'ETH'
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
