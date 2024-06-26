import { indexBy } from "@fxts/core"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

export const useQuote = () => {
  return useSuspenseQuery(
    queryOptions({
      queryKey: ["quote"] as const,
      queryFn: getQuote,
    }),
  )
}

export const getQuote = async () => {
  const { results } = await fetch("/rpc/v2/quote/getQuote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      networkId: "networks/base-mainnet",
      chainId: "8453",
      nativeAssetSymbols: ["ETH"],
      contractAddresses: ["0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"],
    }),
  }).then<R>((r) => r.json())

  return indexBy((r) => r.symbol, results)
}

export interface R {
  results: Result[]
}

export interface Result {
  name: string
  symbol: string
  networkId: string
  contractAddress?: string
  coingeckoId: string
  cmcId: string
  coinbaseId: string
  price: number
  marketCap: number
  volume24h: number
  timestamp: Date
  isNative: boolean
  chainId: number
}
