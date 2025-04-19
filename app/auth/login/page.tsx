"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/lib/auth-service"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await loginUser({ email, password })

      if (data.token) {
        login(data.token, data.user)
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
        })
        router.push("/")
      } else {
        throw new Error("Login failed")
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description:
          error.message || "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="!border-none w-full max-w-md shadow-lg rounded-2xl bg-white">
        <CardHeader className="!border-none">
          <CardTitle className="!border-none text-2xl text-center font-semibold">
            Login
          </CardTitle>
          <CardDescription className=" !border-none text-center text-sm text-gray-500">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form className="pb-3 !border-none" onSubmit={handleSubmit}>
          <CardContent className="!border-none space-y-5">
            <div className="!border-none space-y-1.5">
              <Label className="!border-none" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="!border-none bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm rounded-lg px-4 py-2 border-0"
              />
            </div>
            <div className="!border-none space-y-1.5">
              <div className="!border-none flex items-center justify-between">
                <Label className="!border-none" htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="!border-none text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pb-5 bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm rounded-lg px-4 py-2 border-0"
              />
            </div>
          </CardContent>
          <CardFooter className="!border-none mt-1 pt-3 flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className=" !border-none text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="!border-none text-blue-600 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
