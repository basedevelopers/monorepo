import { isTestnet } from "@/utils/isTestnet"
import { isServer } from "@basedev/common/utils/isServer"
import { http, createPublicClient } from "viem"
import { base, baseSepolia } from "viem/chains"

export const pc = createPublicClient({
  chain: isTestnet() ? baseSepolia : base,
  transport: http(
    `${isServer() ? "https://" : "/r/"}chain-proxy.wallet.coinbase.com?targetName=${isTestnet() ? "base-sepolia" : "base"}`,
  ),
})
