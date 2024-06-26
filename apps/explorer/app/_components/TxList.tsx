"use client"

import { TxItem } from "@/app/_components/TxItem"
import { useTxs } from "@/app/_hooks/useTxs"
import { Async } from "@basedev/common/components/AsyncBoundary"
import { Loader } from "@basedev/common/components/Loader"
import { useParams } from "next/navigation"

export const TxList = () => {
  return (
    <Async pending={<Pending />}>
      {/* <Pending /> */}
      <Resolved />
    </Async>
  )
}

const Pending = () => {
  return (
    <div className="mt-8 flex flex-col items-center gap-2 p-2">
      <Loader size={6} />
    </div>
  )
}

const Resolved = () => {
  const params = useParams<{ address: string }>()
  const { data: txs } = useTxs(params)

  return (
    <div className="flex flex-col gap-2 p-2">
      {txs.length === 0 ? (
        <span className="mx-auto">{`No transactions found`}</span>
      ) : (
        txs.map((tx) => <TxItem key={tx.hash} hash={tx.hash} />)
      )}
    </div>
  )
}
