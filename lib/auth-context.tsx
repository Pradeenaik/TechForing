"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setIsLoading(false)
  }, [])

  const login = (token: string, userData: User) => {
    // Store token and user data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))

    // Set cookie for server-side auth check
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

    setUser(userData)
  }

  const logout = () => {
    // Clear stored data
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Clear cookie
    document.cookie = "token=; path=/; max-age=0"

    setUser(null)
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
