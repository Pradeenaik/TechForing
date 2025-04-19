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
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <Header />
      <main className="!borer-none container mx-auto px-4 py-10">
        <div className="!border-none flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <h1 className="!border-none text-3xl font-bold tracking-tight text-slate-900">
            Job Listings
          </h1>
          <Button
            onClick={() => router.push("/jobs/create")}
            className="!borer-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 shadow-sm"
          >
            <PlusCircle size={18} />
            Post a Job
          </Button>
        </div>

        <div className="!borer-none bg-white rounded-xl border border-slate-200 p-6 shadow-md">
          <JobFilters onFilter={handleFilter} />
        </div>

        <div className="!border-none mt-10">
          <JobList jobs={filteredJobs} loading={loading} />
        </div>
      </main>
    </div>
  )
}
