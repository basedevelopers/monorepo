import { http, createPublicClient } from "viem"
import { base } from "viem/chains"
import { hexToData } from "./utils/hexToData"

const pc = createPublicClient({
  chain: base,
  transport: http(),
})

const main = async () => {
  const hash =
    "0x3bf4fbb7e1d9c9a7ac589db2ee84852a62d10265c4e07f4052311bd6d4b34035"
  const tx = await pc.getTransaction({ hash })

  const hex = tx.input

  // const data = hexToString(hex)
  const data = hexToData(hex)

  if (!data) {
    console.log(data)
    throw new Error("No data found")
  }

  console.log("data", data)
}

main()
