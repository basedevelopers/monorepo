"use client"

import { Value } from "@/app/_components/Value"
import { BaseLogo } from "@basedev/common/components/BaseLogo"
import { Loader2 } from "@basedev/common/components/Loader2"
import { Button } from "@basedev/common/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@basedev/common/components/ui/card"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@basedev/common/components/ui/form"
import { Input } from "@basedev/common/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@basedev/common/components/ui/tabs"
import { sendLog } from "@basedev/common/hooks/useLogging"
import { getHost } from "@basedev/common/utils/getHost"
import { BasePay } from "@basedev/pay"
import type { SupportedCurrency } from "@basedev/pay/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck, ExternalLink } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type Address, isAddress } from "viem"
import { z } from "zod"

const FormSchema = z.object({
  network: z.string().min(1),
  to: z.custom<Address>(isAddress),
  currency: z.string().min(1),
  amount: z.number().positive(),
})

type FormValues = z.infer<typeof FormSchema>

export default function Page() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: "testnet",
      currency: "USDC",
      amount: 0.01,
      to: `0x17524BD1e132610a39C9C87845992Ce6dB331B68`,
    },
    shouldUnregister: false,
  })
  const {
    formState: { isSubmitting: isPending, isValid },
    handleSubmit,
    register,
    setValue,
    watch,
  } = form

  const { amount, currency } = watch()

  const onSubmit = handleSubmit(async (data) => {
    const { amount, currency, to, network } = data
    const testnet = network === "testnet"

    sendLog(`Payment sent to ${to} with ${amount} ${currency} on ${network}`)

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

    toast.success(
      <>
        <CircleCheck className="size-5" />
        <span>Payment sent!</span>
        <div className="grow" />
        <Button variant="link" className="gap-1.5" asChild>
          <a
            href={`${getHost()[`EXPLORER${testnet ? "_TESTNET" : ""}`]}/a/${to}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorer
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </>,
      {
        duration: 10_000,
        closeButton: true,
      },
    )

    return { hash }
  })

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-[20%] size-fit w-full max-w-md p-1"
        onSubmit={onSubmit}
      >
        <fieldset disabled={isPending}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2.5 text-xl">
                <BaseLogo className="size-8 fill-[#0052FF]" />
                Conect-less Payments Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormItem>
                <FormLabel className="ml-1">Network</FormLabel>
                <FormControl>
                  <Tabs
                    defaultValue="testnet"
                    className="w-full"
                    onValueChange={(v) => {
                      setValue("network", v)
                    }}
                  >
                    <TabsList className="h-10 w-full">
                      <TabsTrigger className="h-full grow" value="testnet">
                        Testnet
                      </TabsTrigger>
                      <TabsTrigger className="h-full grow" value="mainnet">
                        Mainnet
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1">To Address</FormLabel>
                <FormControl>
                  <Input
                    className="w-full font-mono text-xs tabular-nums"
                    {...register("to")}
                    placeholder="To Address (0x...)"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1 flex h-6 items-center justify-between">
                  Currency
                  <Button
                    asChild
                    variant="link"
                    className="flex h-4 gap-1 self-end p-0 text-xs opacity-70 hover:opacity-100"
                  >
                    <a
                      href="https://faucet.circle.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sendLog(`USDC Faucet`)
                      }}
                    >
                      USDC Faucet
                      <ExternalLink className="size-3" />
                    </a>
                  </Button>
                </FormLabel>
                <FormControl>
                  <Tabs
                    defaultValue="USDC"
                    className=""
                    onValueChange={(v) => {
                      setValue("currency", v)
                      setValue("amount", v === "ETH" ? 0.0001 : 0.01)
                    }}
                  >
                    <TabsList className="h-10 w-full">
                      <TabsTrigger className="h-full grow" value="ETH">
                        ETH
                      </TabsTrigger>
                      <TabsTrigger className="h-full grow" value="USDC">
                        USDC
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1 flex h-6 items-center justify-between gap-2">
                  Amount
                  <Value amount={amount} currency={currency} />
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full font-mono text-xs tabular-nums"
                    {...register("amount", {
                      valueAsNumber: true,
                    })}
                    placeholder="Amount"
                  />
                </FormControl>
              </FormItem>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="h-10 w-full font-medium text-lg"
                size="sm"
                disabled={!isValid}
              >
                {isPending ? <Loader2 className="size-5" /> : `Buy`}
              </Button>
            </CardFooter>
          </Card>
        </fieldset>
      </form>
    </Form>
  )
}
