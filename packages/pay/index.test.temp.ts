// import { BasePay } from "@basedev/pay/connectless"
// import { BasePay } from "./BasePay"
import { hexToString } from "viem"
import { http, createPublicClient } from "viem"
import { base, baseSepolia } from "viem/chains"
import { hexToData } from "./utils/hexToData.ts"
// import { test } from "vitest"

// test("index.ts", async () => {
// const { hash } = await Base.payment({
//   currency: "USDC",
//   amount: 0.01,
//   products: [
//     {
//       id: "1",
//       name: "product 1",
//       image: "https://example.com/image.png",
//     },
//   ],
// })

// const balance = await Base.client.readContract({
//   address: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`,
//   functionName: "balanceOf",
//   args: [`0x6c95305d05CccD9376799c8e9514ADAAF8a46d6C`],
//   abi: erc20abi,
// })

// console.log(USDC)

// console.log("hash", hash)

// expect(tx.msg.feePayer).toBe("7UQK7N11TA4GEgLrdMBKMEoQgXyF67hei9VcHGQLRwCx")
// })

export const pc = createPublicClient({
  // chain: baseSepolia,
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
