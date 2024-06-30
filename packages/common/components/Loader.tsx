import type { ComponentProps } from "react"
import { cn } from "../lib/utils"

type Props = {
  size?: number
} & ComponentProps<"div">

export const Loader = ({ size = 4, className, ...props }: Props) => {
  const speed = 0.5
  return (
    <div
      className={cn("inset-0 aspect-square", className)}
      style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
      }}
      {...props}
    >
      <div
        className={cn("relative top-1/2 left-1/2")}
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
      >
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              className="-left-[10%] -top-[3.9%] absolute h-[8%] w-[24%] animate-spinner rounded-md bg-[hsl(0,0%,43.5%)]"
              style={{
                animationDuration: `${speed}s`,
                animationIterationCount: "infinite",
                animationDelay: `-${((12 - i) / 10) * speed}s`,
                transform: `rotate(${i * 30}deg) translate(146%)`,
              }}
              key={`spinner-bar-${i}`}
            />
          ))}
      </div>
    </div>
  )
}
