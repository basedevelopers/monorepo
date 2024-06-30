import { publicActionReverseMirage } from "reverse-mirage"
import {
  http,
  type Address,
  type Chain,
  type Client,
  type RpcSchema,
  type Transport,
  createPublicClient,
  isAddress,
  type publicActions,
} from "viem"
import { base, baseSepolia } from "viem/chains"
import { payment } from "./payment"

type BasePayParams = {
  to: Address
  transport?: Transport
  testnet?: boolean
}

const PAYMASTER_URL: { [key: string]: string } = {
  [base.id]: `https://api.developer.coinbase.com/rpc/v1/base/7jvXamhQ7ntv6o4pmGSNlRuPifq9Q95b`,
  [baseSepolia.id]: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/7jvXamhQ7ntv6o4pmGSNlRuPifq9Q95b`,
}

/**
 * BasePay is a function that creates a BaseInstance
 *
 * @param {BasePayParams} params - The parameters for the BasePay function.
 * @param {Address} params.to - The address to send the payment to.
 * @param {Transport} [params.transport] - The transport to use for the client.
 * @param {boolean} [params.testnet=false] - Whether to use the Base Sepolia testnet or not.
 *
 * @returns {BaseInstance} - The BaseInstance created by the BasePay function.
 */
export const BasePay = (params: BasePayParams): BaseInstance => {
  const { to, testnet = false } = params

  if (!isAddress(to)) {
    throw new Error(`Invalid address: ${to}`)
  }

  const chain: Chain = testnet ? baseSepolia : base

  const transport =
    params.transport || http(PAYMASTER_URL[chain.id], { retryCount: 0 })

  const Base: BaseInstance = {
    to,
    client: createPublicClient({
      chain,
      transport,
    }).extend(publicActionReverseMirage),
    chain,
    transport,
    payment: (params) => payment(Base)(params),
  }

  return Base
}

export type BaseInstance = {
  client: Client<
    Transport,
    Chain,
    undefined,
    RpcSchema,
    ReturnType<typeof publicActionReverseMirage> &
      ReturnType<typeof publicActions>
  >
  payment: ReturnType<typeof payment>
} & Omit<Required<BasePayParams>, "testnet"> & {
    chain: Chain
  }
