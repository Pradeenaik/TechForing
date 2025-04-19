"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/lib/auth-context"
import { getAllJobs } from "@/lib/job-service"
import type { Job } from "@/lib/types"
import JobList from "@/components/jobs/job-list"

export default function ProfilePage() {
  const [userJobs, setUserJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const fetchUserJobs = async () => {
      try {
        const jobs = await getAllJobs()
        // Filter jobs posted by the current user
        const filteredJobs = jobs.filter((job) => job.userId === user.id)
        setUserJobs(filteredJobs)
      } catch (error) {
        console.error("Error fetching user jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserJobs()
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="!border-none text-3xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        {/* Login or Register Form */}
        <form className="!border-none space-y-6">
          <div className="!border-none space-y-2">
            <label htmlFor="email" className="!border-none block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="!border-none space-y-2">
            <label htmlFor="password" className="!border-none block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div className="!border-none">
            <button
              type="submit"
              className="w-full py-3 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="!border-none mt-6 text-center">
          <p className="!border-none text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="!border-none text-blue-600 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
