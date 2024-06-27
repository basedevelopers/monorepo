export const isProd = () => {
  return process.env.VERCEL_ENV === "production"
}
