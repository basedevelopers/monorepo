import { BaseLogo } from "@basedev/common/components/BaseLogo"
import { Button } from "@basedev/common/components/ui/button"

export const Home = () => {
  return (
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2.5">
        <BaseLogo className="size-10 fill-[#0052FF]" />
        <h1 className="font-semibold text-4xl">Connect-less Pay</h1>
      </div>
      <h2 className="text-sm opacity-70">
        Simple and secure crypto payments, without connect wallet
      </h2>
      <Button>Hi1</Button>
    </div>
  )
}
