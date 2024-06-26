import type { Address } from "viem"
import type { SupportedCurrency } from "./payment"

type GetBalanceParams = {
  address: Address
  currency: SupportedCurrency
}

export const getBalance = async ({ address, currency }: GetBalanceParams) => {
  if (currency === "ETH") {
  }

  return { balance: 0 }
}
