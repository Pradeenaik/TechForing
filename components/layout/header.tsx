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
      <div className=" container  flex h-16 border-none bg-header items-center justify-between text-white">
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
          <Logo />

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
              <Button
                variant="ghost"
                className="!border-none relative h-9 w-9 rounded-full hover:bg-primary/10 transition"
              >
                <Avatar className="!border-none h-9 w-9">
                  <AvatarFallback className="!border-none bg-primary text-white font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl border border-gray-200 shadow-lg p-2 bg-white"
            >
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-muted text-primary font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  <span className="!border-none text-muted-foreground">{user.email}</span>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="text-sm hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer">
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="text-sm hover:bg-gray-100 px-2 py-2 rounded-md cursor-pointer">
                <Link href="/jobs/create" className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600" />
                  <span>Post a Job</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-sm text-red-600 hover:bg-red-50 px-2 py-2 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 text-red-500" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/auth/login")}
              className="hover:bg-primary/10 transition"
            >
              Login
            </Button>
            <Button onClick={() => router.push("/auth/register")} className="bg-primary text-white hover:bg-primary/90">
              Register
            </Button>
          </div>
        )}

      </div>
    </header>
  )
}
