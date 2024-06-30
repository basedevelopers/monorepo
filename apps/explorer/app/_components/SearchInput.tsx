"use client"

import { Input } from "@basedev/common/components/ui/input"
import { Search } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { isAddress } from "viem"

export function SearchInput() {
  const { replace } = useRouter()
  const params = useParams()
  const address = params.address as string

  return (
    <div className="group relative flex w-full items-center">
      <Search className="absolute mx-2.5 aspect-square size-4 stroke-border group-focus-within:stroke-ring" />

      <Input
        className="rounded-full pl-8 font-mono text-xs tabular-nums"
        placeholder="Enter settlement address"
        autoFocus
        defaultValue={address}
        onChange={({ target }) => {
          const value = target.value

          if (!value) {
            replace("/")
            return
          }

          if (isAddress(value)) {
            replace(`/a/${target.value}`)
          }
        }}
      />
    </div>
  )
}
