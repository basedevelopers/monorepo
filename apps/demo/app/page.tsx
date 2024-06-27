"use client"

import { Loader2 } from "@basedev/common/components/Loader2"
import { Button } from "@basedev/common/components/ui/button"
import { Input } from "@basedev/common/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@basedev/common/components/ui/tabs"
import { BasePay } from "@basedev/pay"
import type { SupportedCurrency } from "@basedev/pay/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type Address, isAddress } from "viem"
import { z } from "zod"

const FormSchema = z.object({
  to: z.custom<Address>(isAddress),
  currency: z.string().min(1),
  amount: z.number().positive(),
  network: z.string().min(1),
})

type FormValues = z.infer<typeof FormSchema>

export default function Page() {
  const {
    formState: { isSubmitting: isPending },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: "testnet",
      currency: "USDC",
      amount: 0.01,
      to: `0xB837A38cf795206771A1f851192bD65a6f9f936F`,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const { amount, currency, to, network } = data
    const testnet = network === "testnet"

    const Base = BasePay({
      testnet,
      to,
    })

    const { hash } = await Base.payment({
      currency: currency as SupportedCurrency,
      amount,
      products: [
        {
          id: crypto.randomUUID(),
          name: `Product ${Math.random().toString().slice(-3)}`,
          image: `https://picsum.photos/id/${Math.floor(Math.random() * 1085)}/500/500`,
        },
      ],
    })

    return { hash }
  })

  return (
    <form className="" onSubmit={onSubmit}>
      <fieldset className="flex flex-col gap-2 p-2" disabled={isPending}>
        <Tabs
          defaultValue="testnet"
          className=""
          onValueChange={(v) => {
            setValue("network", v)
          }}
        >
          <TabsList>
            <TabsTrigger className="w-20" value="testnet">
              Testnet
            </TabsTrigger>
            <TabsTrigger className="w-20" value="mainnet">
              Mainnet
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          className="w-96"
          {...register("to")}
          placeholder="To Address (0x...)"
        />

        <Tabs
          defaultValue="USDC"
          className=""
          onValueChange={(v) => {
            setValue("currency", v)
          }}
        >
          <TabsList>
            <TabsTrigger className="w-20" value="USDC">
              USDC
            </TabsTrigger>
            <TabsTrigger className="w-20" value="ETH">
              ETH
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Input className="w-40" {...register("amount")} placeholder="Amount" />

        <Button
          type="submit"
          className="m-0 h-8 w-20 font-medium text-sm"
          size="sm"
        >
          {isPending ? <Loader2 className="size-5" /> : `Buy`}
        </Button>
      </fieldset>
    </form>
  )
}
