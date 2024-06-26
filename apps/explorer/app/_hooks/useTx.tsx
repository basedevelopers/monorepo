import { type getTxs, getTxsOps, useTxs } from "@/app/_hooks/useTxs"
import {
  queryOptions,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useParams } from "next/navigation"

type Params = {
  hash: string
}

export const useTx = ({ hash }: Params) => {
  const client = useQueryClient()
  const { address } = useParams<{ address: string }>()

  return useSuspenseQuery(
    queryOptions({
      queryKey: ["txs", address, hash] as const,
      initialData: client
        .getQueryData<Awaited<ReturnType<typeof getTxs>>>(
          getTxsOps({ address }).queryKey,
        )
        ?.find((tx) => tx.hash === hash)!,
    }),
  )
}
