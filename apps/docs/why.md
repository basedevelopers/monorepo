# Why Connect-less Payments?

:::warning
This library is **NOT** an official library of Coinbase.  
As it is under active development, the interface may change.
:::

## The Problems

- **"Connect Wallet" is not secure and safe**: In many cases, we click the "Connect Wallet" button to use websites or make online purchases. However, this feels unsafe from a user's perspective, and website operators can see the wallet address and all transaction records of the wallet.

- **Hard to integrate wallet SDK**: Existing SDKs that require wallet connection need to manage the state of whether the wallet is connected, and it's difficult to integrate them with just a few lines of code.

- **Hard to build payment system from scratch**: Building a payment system from scratch is challenging.
