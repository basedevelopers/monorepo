import type { SVGProps } from "react"
import { cn } from "../lib/utils"

type Props = SVGProps<SVGSVGElement>

export const ConnectlessLogo = (props: Props) => {
  return (
    <svg
      width="1000"
      height="1000"
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn("fill-primary", props.className)}
    >
      <g clip-path="url(#clip0_4984_28)">
        <path
          d="M500 1000C776.142 1000 1000 776.142 1000 500C1000 223.858 776.142 0 500 0C223.858 0 0 223.858 0 500C0 776.142 223.858 1000 500 1000Z"
          fill="current"
        />
        <rect x="150" y="147" width="700" height="700" rx="350" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_4984_28">
          <rect width="1000" height="1000" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

// rgb(107, 38, 217)
// #6B26D9
// hsl(263.4, 70%, 50.4%)
