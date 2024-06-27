"use client"

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
  FormDescription,
  FormItem,
  FormLabel,
} from "@basedev/common/components/ui/form"
import { Input } from "@basedev/common/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@basedev/common/components/ui/tabs"
import { useLogging } from "@basedev/common/hooks/useLogging"
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
  to: z.custom<Address>(isAddress),
  currency: z.string().min(1),
  amount: z.number().positive(),
  network: z.string().min(1),
})

type FormValues = z.infer<typeof FormSchema>

export default function Page() {
  const { sendLog } = useLogging()
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      network: "testnet",
      currency: "USDC",
      amount: 0.01,
      to: `0xB837A38cf795206771A1f851192bD65a6f9f936F`,
    },
  })
  const {
    formState: { isSubmitting: isPending },
    handleSubmit,
    register,
    setValue,
  } = form

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
              <CardTitle className="flex items-center gap-2.5 text-lg">
                <BaseLogo className="size-8 fill-[#0052FF]" />
                Base Payments Demo
              </CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
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
                    className="w-full text-xs tabular-nums"
                    {...register("to")}
                    placeholder="To Address (0x...)"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1">Currency</FormLabel>
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
                      <TabsTrigger className="grow" value="ETH">
                        ETH
                      </TabsTrigger>
                      <TabsTrigger className="grow" value="USDC">
                        USDC
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel className="ml-1">Amount</FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-xs tabular-nums"
                    {...register("amount")}
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
