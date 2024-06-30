"use client"

import { useColorTheme } from "@/app/_hooks/useColorTheme"
import { isTestnet } from "@/utils/isTestnet"
import { ConnectlessLogo } from "@basedev/common/components/BaseLogo"
import { Badge } from "@basedev/common/components/ui/badge"
import { Button } from "@basedev/common/components/ui/button"
import {
  Command,
  CommandItem,
  CommandList,
} from "@basedev/common/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@basedev/common/components/ui/popover"
import { cn } from "@basedev/common/lib/utils"
import { IconBrandGithub } from "@tabler/icons-react"
import { LaptopMinimal, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)
  const { setTheme, theme, themes } = useTheme()
  const { toggle, colorTheme } = useColorTheme()

  return (
    <header className="flex min-h-12 w-full items-center gap-2 px-2.5 py-3">
      <ConnectlessLogo
        className={cn("aspect-square size-8 cursor-pointer hover:opacity-80")}
        onClick={toggle}
      />

      <h1 className="flex select-none items-center gap-2.5 font-semibold text-md">
        Base Payments Explorer
        {isTestnet() && (
          <Badge
            className="h-fit animate-fade-up p-0.5 px-1 text-[10px] text-primary"
            variant="outline"
          >
            Testnet
          </Badge>
        )}
      </h1>

      <div className="grow" />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 p-0" align="end">
          <Command>
            <CommandList>
              <CommandItem
                className="flex gap-1.5"
                onSelect={(currentValue) => {
                  setTheme(themes[(themes.indexOf(theme!) + 1) % themes.length])
                }}
              >
                {theme === "dark" ? (
                  <>
                    <LaptopMinimal className="aspect-square size-5" />
                    System
                  </>
                ) : theme === "light" ? (
                  <>
                    <Moon className="aspect-square size-5" />
                    Dark
                  </>
                ) : theme === "system" ? (
                  <>
                    <Sun className="aspect-square size-5" />
                    Light
                  </>
                ) : null}
              </CommandItem>
              <CommandItem className="flex gap-1.5" asChild>
                <a
                  href="https://github.com/basedevelopers/monorepo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="aspect-square size-5" />
                  GitHub
                </a>
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </header>
  )
}
