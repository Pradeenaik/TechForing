//components/layout/header.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, LogOut, User, Briefcase, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "../Logo"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md shadow-md">
      <div className="container  flex h-16 border-none bg-header items-center justify-between text-white">
        <div className="flex items-center !border-none bg-header gap-2 md:gap-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className=" !border-none w-[240px] sm:w-[300px]">
              <nav className="flex flex-col !border-none gap-4 mt-8">
                <Link
                  href="/"
                  className="text-lg !border-none font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/jobs/create"
                  className="text-lg font-medium !border-none  hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Post a Job
                </Link>
                <Link
                  href="/profile"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <Logo/>

          {/* <Link href="/" className="flex items-center !border-none space-x-2">
            <span className="font-bold text-xl text-white !border-none bg-header hidden md:inline-block">Job Portal</span>
          </Link> */}

          <nav className="hidden !border-none bg-header md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium bg-header !border-none transition-colors text-white">
              Home
            </Link>
            <Link href="/jobs/create" className="font-medium !border-none bg-header text-white transition-colors ">
              Post a Job
            </Link>
          </nav>
        </div>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jobs/create" className="cursor-pointer flex w-full items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Post a Job</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => router.push("/auth/login")}>
              Login
            </Button>
            <Button onClick={() => router.push("/auth/register")}>Register</Button>
          </div>
        )}
      </div>
    </header>
  )
}
