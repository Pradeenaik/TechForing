"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Header from "@/components/layout/header"
import JobFilters from "@/components/jobs/job-filters"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { getAllJobs } from "@/lib/job-service"
import type { Job } from "@/lib/types"
import JobList from "../jobs/job-list"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs()
        setJobs(jobsData)
        setFilteredJobs(jobsData)
      } catch (error: any) {
        toast({
          title: "Error fetching jobs",
          description: error.message || "Failed to load jobs",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [toast])

  const handleFilter = (filters: any) => {
    let filtered = [...jobs]

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm),
      )
    }

    if (filters.jobType && filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType)
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((job) => job.location === filters.location)
    }

    setFilteredJobs(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <Button onClick={() => router.push("/jobs/create")} className="flex items-center gap-2">
            <PlusCircle size={16} />
            Post a Job
          </Button>
        </div>

        <JobFilters onFilter={handleFilter} />

        <div className="mt-8">
          <JobList jobs={filteredJobs} loading={loading} />
        </div>
      </main>
    </div>
  )
}
