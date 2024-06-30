"use client"

import { usePrice } from "@/app/_hooks/usePrice"
import { Async } from "@basedev/common/components/AsyncBoundary"
import { Loader } from "@basedev/common/components/Loader"

type Props = {
  amount: number
  currency: string
}

export const Value = (props: Props) => {
  return (
    <Async pending={<Pending />}>
      {/* <Pending /> */}
      <Resolved {...props} />
    </Async>
  )
}

const Pending = () => {
  return (
    <div className="mt-auto px-1 ">
      <Loader size={3.5} />
    </div>
  )
}

const Resolved = ({ amount, currency }: Props) => {
  const { price } = usePrice({ currency })

  const value = price * amount

  return (
    <div className="mt-auto max-w-60 grow truncate px-1 text-right font-mono text-xs tabular-nums opacity-60">
      {!Number.isNaN(value)
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(price * amount)
        : ``}
    </div>
  )
}
