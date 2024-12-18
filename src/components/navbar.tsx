/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import Link from "next/link";
// import { useTheme } from 'next-themes'
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InputDemo from "./ui/search";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/data", label: "Data" },
  { href: "/charts", label: "Charts" },
  { href: "/analytics", label: "Analytics" },
];

export function Navbar() {
  // const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
      <div className="flex h-12 items-center ">
        <div className="ml-6 hidden md:flex w-full justify-between">
          <Link href="/data" className="flex items-center space-x-2 ml-16">
            <span className="hidden font-bold text-6xl text-sky-500 sm:inline-block">
              Intellytics
            </span>
          </Link>
          <nav className="flex items-center justify-center space-x-6 text-xl font-medium h-16">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-end justify-end p-4">
            <InputDemo />
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="flex flex-col space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// function ThemeToggle() {
//   const { setTheme } = useTheme()
//
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
//           <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
