import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
} from "permissionless"
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts"
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico"
import { type Hex, parseEther, parseUnits, toHex } from "viem"
import { type Address, generatePrivateKey } from "viem/accounts"
import type { BaseInstance } from "./BasePay"
import { USDC } from "./tokens/USDC"
import { closePopup } from "./utils/closePopup"
import { abi } from "./utils/erc20.abi"
import { openPopup } from "./utils/openPopup"
import { wait } from "./utils/wait"

type PaymentParams = {
  currency: SupportedCurrency
  amount: number
  products?: Product[]
}

const MINIMUM_USDC_AMOUNT = 0.01

let popup: Window | null = null

type PaymentReturn = {
  hash: Hex
}

type Payment = (
  Base: BaseInstance,
) => (params: PaymentParams) => Promise<PaymentReturn>

/*
 * payment is a function that creates a payment transaction.
 *
 * @params {BaseInstance} Base - The BaseInstance to use for the payment.
 * @params {PaymentParams} params - The parameters for the payment transaction.
 * @params {SupportedCurrency} params.currency - The currency to use for the payment. Either "ETH" or "USDC".
 * @params {number} params.amount - The amount to pay.
 * @params {Product[]} [params.products] - The products to pay for.
 *
 * @returns {Promise<PaymentReturn>} - The payment transaction hash.
 */
export const payment: Payment = (Base) => async (params) => {
  const { client, to, chain, transport } = Base
  const { currency, amount, products } = params

  if (currency === "USDC" && amount < MINIMUM_USDC_AMOUNT) {
    throw new Error(`Minimum amount for USDC is ${MINIMUM_USDC_AMOUNT}`)
  }

  const privateKey = generatePrivateKey()
  // const account = privateKeyToAccount(privateKey)

  const simpleAccount = await privateKeyToSimpleSmartAccount(client, {
    privateKey,
    // address: account.address,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  })

  popup = openPopup(
    `https://wallet.coinbase.com/send?${new URLSearchParams({
      to: simpleAccount.address,
      amount: `${amount}`,
      currency,
      chainId: `${chain.id}`,
    })}`,
  )

  const cloudPaymaster = createPimlicoPaymasterClient({
    chain,
    transport,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
  })

  const smartAccountClient = createSmartAccountClient({
    account: simpleAccount,
    chain,
    bundlerTransport: transport,
    middleware: {
      sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
    },
  })

  const success = await waitPayment({
    address: simpleAccount.address,
    amount,
    client,
    currency,
  })

  if (!success) {
    throw new Error(`User closed the popup without paying`)
  }

  closePopup(popup)

  const data = toHex(
    JSON.stringify({
      domain: globalThis.location.toString(),
      products,
    }),
  )

  const txHash = await (currency === "ETH"
    ? smartAccountClient.sendTransaction({
        account: smartAccountClient.account,
        to,
        data,
        value: parseEther(`${amount}`),
      })
    : smartAccountClient.writeContract({
        account: smartAccountClient.account,
        abi,
        address: USDC[chain.id].address,
        functionName: "transfer",
        args: [to, parseUnits(`${amount}`, USDC[chain.id].decimals)],
        dataSuffix: data,
      }))

  return { hash: txHash }
}

type Product = {
  id: string
  name: string
  image?: string
}

export type SupportedCurrency = "ETH" | "USDC"

type WaitPaymentParams = {
  address: Address
  amount: number
  client: BaseInstance["client"]
  currency: SupportedCurrency
}

export const waitPayment = ({
  address,
  amount,
  client,
  currency,
}: WaitPaymentParams) =>
  new Promise(async (resolve) => {
    while (popup?.window) {
      if (currency === "ETH") {
        const balance = await client.getBalance({ address })

        if (balance === parseEther(`${amount}`)) {
          resolve(true)
          return
        }

        await wait(client.transport.retryDelay ?? 500)
      } else if (currency === "USDC") {
        const { amount: balance } = await client.getERC20BalanceOf({
          erc20: USDC[client.chain.id],
          address,
        })

        if (
          balance === parseUnits(`${amount}`, USDC[client.chain.id].decimals)
        ) {
          resolve(true)
          return
        }

        await wait(client.transport.retryDelay ?? 500)
      }
    }

    resolve(false)
  })
