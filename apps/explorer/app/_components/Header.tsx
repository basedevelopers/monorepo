"use client"

import { BaseLogo } from "@/app/_components/Baselogo"
import { useColorTheme } from "@/app/_hooks/useColorTheme"
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
      <BaseLogo
        className={cn(
          "aspect-square size-8 cursor-pointer hover:opacity-80",
          colorTheme === "blue" ? `fill-[#0052FF]` : `fill-primary`,
        )}
        onClick={toggle}
      />

      <h1 className="select-none font-semibold text-lg">
        Base Payments Explorer
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
              <CommandItem className="flex gap-1.5">
                <IconBrandGithub className="aspect-square size-5" />
                GitHub
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </header>
  )
}
