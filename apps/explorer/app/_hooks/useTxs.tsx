import { pc } from "@/lib/viem/pc"
import { isTestnet } from "@/utils/isTestnet"
import { isServer } from "@basedev/common/utils/isServer"
import { hexToData } from "@basedev/pay/utils/hexToData"
import {
  concurrent,
  filter,
  indexBy,
  map,
  pipe,
  tap,
  toArray,
  toAsync,
} from "@fxts/core"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import type { Hex } from "viem"
import { z } from "zod"

type Params = {
  address: string
}

type UseTxsParams = OptionParams

export const useTxs = ({ address, ...rest }: UseTxsParams) => {
  return useSuspenseQuery(getTxsOps({ address, ...rest }))
}

type OptionParams = Params &
  Omit<
    Parameters<
      typeof queryOptions<
        Awaited<ReturnType<typeof getTxs>>,
        Error,
        Awaited<ReturnType<typeof getTxs>>,
        readonly ["txs", string]
      >
    >[0],
    "queryKey" | "queryFn"
  >

export const getTxsOps = ({ address, ...rest }: OptionParams) =>
  queryOptions({
    queryKey: ["txs", address] as const,
    queryFn: () => getTxs({ address }),
    ...rest,
  })

export const getTxs = async ({ address }: Params) => {
  const { result } = await fetch(`/rpc/v3/txHistory/getForAddress`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      address,
      network: `networks/${isTestnet() ? `base-sepolia-testnet` : `base-mainnet`}`,
    }),
  }).then<R>((r) => r.json())

  const transactions = result.transactions

  // const tx = await pc.getTransaction({ hash: result.transactions[0].hash })

  // const txRecept = await pc.getTransactionReceipt({
  //   hash: result.transactions[0].hash,
  // })

  if (transactions.length === 0) return []

  const indexed = indexBy((t) => t.hash, transactions)

  return pipe(
    transactions,
    toAsync,
    map(({ hash }) => pc.getTransaction({ hash })),
    concurrent(transactions.length ?? 1),
    map((tx) => ({
      ...tx,
      ...indexed[tx.hash],
      data: hexToData(tx.input) as DataType,
    })),
    // toArray,
    // tap((txs) => console.log(txs)),
    filter(({ data }) => dataSchema.safeParse(data).success),
    // Transform
    map((tx) => ({
      hash: tx.hash,
      status: tx.status,
      amount: tx.transfers[0].amount,
      currency: tx.transfers[0].assetAddress === "native" ? "ETH" : "USDC",
      domain: tx.data.domain,
      products: tx.data.products,
      timestamp: tx.timestamp,
    })),
    toArray,
  )
}

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
})

const dataSchema = z.object({
  domain: z.string().url(),
  products: z.array(productSchema),
})

type DataType = z.infer<typeof dataSchema>

interface R {
  result: Result
}

interface Result {
  transactions: Transaction[]
  addressMeta: { [key: string]: AddressMeta }
  spamScoreThresholds: SpamScoreThresholds
  paginationToken: string
}

interface AddressMeta {
  domain: Domain
  avatarUrl: string
  token: Token | null
  nftCollection: null
}

enum Domain {
  Empty = "",
}

interface Token {
  symbol: string
  name: string
  decimals: number
  logo: Logo
  spamScore: number
}

interface Logo {
  width: number
  height: number
  url: string
  mimeType: string
  sourceWeight: number
}

interface SpamScoreThresholds {
  whitelist: number
  likelyNotSpam: number
  likelySpam: number
  globalSpam: number
}

interface Transaction {
  hash: Hex
  blockNumber: string
  timestamp: string
  nonce: number
  feeAmount: string
  status: string
  primaryAction: PrimaryAction
  transfers: Transfer[]
  historicalAssetPricesUsd: HistoricalAssetPricesUsd
  userOperations: any[]
}

type HistoricalAssetPricesUsd = {}

interface PrimaryAction {
  type: Type
  swapDetails: null
  bridgeDetails: null
  sendViaLinkDetails: null
  bridgexyzDetails: null
  metadata: HistoricalAssetPricesUsd
}

enum Type {
  LabelReceive = "LABEL_RECEIVE",
}

enum Status {
  TransactionStatusSuccess = "TRANSACTION_STATUS_SUCCESS",
}

interface Transfer {
  fromAddress: string
  toAddress: string
  assetAddress: string
  amount: string
  tokenId: string
}
