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
  [base.id]: `https://api.developer.coinbase.com/rpc/v1/base/RNrmdU_5I-wUkOs27UzotQpWq2qyrwWt`,
  [baseSepolia.id]: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/RNrmdU_5I-wUkOs27UzotQpWq2qyrwWt`,
}

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
