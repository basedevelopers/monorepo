"use client"

import {
  Suspense as ReactSuspense,
  type SuspenseProps,
  useEffect,
  useState,
} from "react"

export const Suspense = ({ children, ...props }: SuspenseProps) => {
  const isMounted = useIsMounted()

  if (isMounted) {
    return <ReactSuspense {...props}>{children}</ReactSuspense>
  }
  return <>{props.fallback}</>
}

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
