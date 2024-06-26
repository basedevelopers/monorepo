import type { ERC20 } from "reverse-mirage"
import { base, baseSepolia } from "viem/chains"

const type = "erc20"
const name = "USDC"
const symbol = "USDC"
const decimals = 6

export const USDC: { [key in number]: ERC20 } = {
  [base.id]: {
    type,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    name,
    symbol,
    decimals,
    chainID: base.id,
    blockCreated: 0n,
  },
  [baseSepolia.id]: {
    type,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    name,
    symbol,
    decimals,
    chainID: baseSepolia.id,
    blockCreated: 0n,
  },
}
