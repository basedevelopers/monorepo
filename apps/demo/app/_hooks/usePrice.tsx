import { useQuote } from "@/app/_hooks/useQuote"

type Params = {
  currency: string
}

export const usePrice = ({ currency }: Params) => {
  const { data: quote } = useQuote()

  return {
    price: quote[currency].price,
  }
}
