/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  compiler: {
    // removeConsole: true,
  },
  async rewrites() {
    return [
      {
        source: `/r/:host/:path*`,
        destination: `https://:host/:path*`,
        basePath: false,
      },
      {
        source: `/rpc/:path*`,
        destination: `https://api.wallet.coinbase.com/rpc/:path*`,
        basePath: false,
      },
      {
        source: `/img/:host/:path*`,
        destination: `https://:host/:path*`,
        basePath: false,
      },
    ]
  },
}
