/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  compiler: {
    // removeConsole: true,
  },
  async rewrites() {
    return [
      {
        source: `/rpc/:path*`,
        destination: `https://api.wallet.coinbase.com/rpc/:path*`,
        basePath: false,
      },
    ]
  },
}
