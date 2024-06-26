"use client"

import { usePrice } from "@/app/_hooks/usePrice"
import { useTx } from "@/app/_hooks/useTx"
import { getRelativeTime } from "@/utils/getRelativeTime"
import { isTestnet } from "@/utils/isTestnet"
import { maskAddress } from "@/utils/maskAddress"
import { Image } from "@basedev/common/components/Image"
import { Button } from "@basedev/common/components/ui/button"
import { CircleCheck, CircleX, ExternalLink } from "lucide-react"
import { type Hex, formatUnits } from "viem"
import { base, baseSepolia } from "viem/chains"

type Props = {
  hash: Hex
}

export const TxItem = ({ hash }: Props) => {
  const { data: tx } = useTx({ hash })

  const { status, amount, currency, domain, timestamp, products } = tx

  const { image, name } = products[0]

  const { price } = usePrice({ currency })

  return (
    <div className="@container">
      <div className="relative flex w-full overflow-hidden rounded-xl border">
        <Image
          unoptimized
          src={image}
          width={200}
          height={200}
          className="aspect-square size-24 @lg:size-32"
          alt={name}
        />

        <div className="flex grow flex-col justify-between overflow-hidden px-3 py-1.5 @lg:p-3 @lg:px-4">
          <h2 className="truncate font-medium text-lg @lg:text-xl">{name}</h2>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <Image
                src={`/${currency}.png`}
                width={200}
                height={200}
                className="aspect-square size-4 @lg:size-5"
                alt={currency}
              />
              <span className="text-md tabular-nums leading-none @lg:text-lg">
                {formatUnits(BigInt(amount), currency === "ETH" ? 18 : 6)}
              </span>
              <span className="text-xs opacity-80 @lg:text-sm">{currency}</span>
            </div>

            <span className="h-4 text-xs tabular-nums opacity-80 @lg:text-sm">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </span>
          </div>
        </div>

        <div className="relative flex min-w-fit flex-col justify-between">
          <div className="flex flex-col items-end gap-2 p-2">
            <div className="flex cursor-default items-center gap-1.5 opacity-80 hover:opacity-100">
              <span className="text-xs">Status</span>
              {status === "TRANSACTION_STATUS_SUCCESS" ? (
                <CircleCheck className="size-4 text-green-500" />
              ) : (
                <CircleX className="size-4 text-red-500" />
              )}
            </div>

            <Button
              className="flex h-4 gap-1.5 p-0 text-xs tabular-nums opacity-80 hover:opacity-100"
              variant="link"
              asChild
            >
              <a
                href={`${(isTestnet() ? baseSepolia : base).blockExplorers.default.url}/tx/${hash}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {maskAddress(hash, 3)}
                <ExternalLink className="size-3" />
              </a>
            </Button>
          </div>

          <div className="flex flex-col items-end gap-1 p-2">
            <Button
              className="hidden h-5 gap-1.5 p-0 text-xs tabular-nums opacity-60 @lg:flex hover:opacity-100"
              variant="link"
              asChild
            >
              <a href={domain} target="_blank" rel="noreferrer noopener">
                {new URL(domain).hostname}
                <ExternalLink className="size-3" />
              </a>
            </Button>
            <time className="cursor-default text-xs opacity-50 hover:opacity-80">
              {getRelativeTime(new Date(+timestamp * 1000))}
            </time>
          </div>
        </div>
      </div>
    </div>
  )
}
