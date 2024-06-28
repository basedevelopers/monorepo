# BasePay

BasePay is a simple payment library that allows you to send money to any address on the Base blockchain with Coinbase Wallet.

# Example

```ts
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
