"use client"

import { Header } from "@/app/_components/Header"
import { SearchInput } from "@/app/_components/SearchInput"
import { TxList } from "@/app/_components/TxList"
import { useParams } from "next/navigation"

export default function Page() {
  const { address } = useParams()

  return (
    <div className="relative flex flex-col">
      <div className="fixed z-20 w-full max-w-screen-sm bg-background">
        <Header />

        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center px-2">
          <SearchInput />
        </div>
      </div>
      <div className="fixed z-10 mt-24 h-6 w-full bg-gradient-to-b from-background to-transparent" />

      {address && (
        <div className="mt-28">
          <TxList />
        </div>
      )}

      <div className="h-32" />
    </div>
  )
}
