"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Building, MapPin, Calendar, Clock, ExternalLink, Edit, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { getJobById, deleteJob } from "@/lib/job-service"
import { useAuth } from "@/lib/auth-context"
import type { Job } from "@/lib/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(params.id)
        setJob(jobData)
      } catch (error: any) {
        toast({
          title: "Error fetching job",
          description: error.message || "Failed to load job details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [params.id, toast])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteJob(params.id)
      toast({
        title: "Job deleted",
        description: "The job has been successfully deleted",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error deleting job",
        description: error.message || "Failed to delete the job",
        variant: "destructive",
      })
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="!border-none container mx-auto px-6 py-12">
          <Button variant="ghost" className="!border-none mb-6" onClick={() => router.back()}>
            <ArrowLeft className="!border-none mr-2 h-4 w-4" />
            Back to Jobs
          </Button>

          <Card className="!border-none shadow-lg">
            <CardContent className="!border-none p-8">
              <div className="!border-none space-y-6">
                <Skeleton className="h-8 w-2/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold">Job not found</h2>
          <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Back to Jobs
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <Button variant="ghost" className="!border-none mb-6" onClick={() => router.back()}>
          <ArrowLeft className="!border-none mr-2 h-4 w-4" />
          Back to Jobs
        </Button>

        <Card className="!border-none shadow-lg">
          <CardContent className="p-8">
            <div className="!border-none flex justify-between items-start">
              <div className="!border-none">
                <h1 className="!border-none text-3xl font-semibold text-gray-800">{job.title}</h1>
                <div className="!border-none flex items-center gap-3 mt-2 text-gray-600">
                  <Building className="!border-none" size={18} />
                  <span className="!border-none font-medium">{job.company}</span>
                  <MapPin size={18} className="!border-none ml-2" />
                  <span className="!border-none">{job.location}</span>
                </div>
              </div>

              <div className="!border-none flex gap-3">
                <Badge variant={job.jobType === "Full-time" ? "default" : "outline"} className="!border-none text-sm">
                  {job.jobType}
                </Badge>

                {user && user.id === job.userId && (
                  <div className="!border-none flex gap-3 ml-4">
                    <Button className="!border-none" variant="outline" size="icon" onClick={() => router.push(`/jobs/edit/${job.id}`)}>
                      <Edit size={16} />
                    </Button>
                    <Button className="!border-none" variant="outline" size="icon" onClick={() => setDeleteDialogOpen(true)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className=" !border-none flex items-center gap-4 mt-6 text-sm text-gray-500 border-b pb-4">
              <div className=" !border-none flex items-center gap-2">
                <Clock className="!border-none" size={14} />
                <span className="!border-none">{job.jobType}</span>
              </div>
              {job.salary && (
                <div className="!border-none flex items-center gap-2">
                  <span className="!border-none">Salary: {job.salary}</span>
                </div>
              )}
              <div className="!border-none flex items-center gap-2">
                <Calendar size={14} />
                <span className="!border-none">Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
              </div>
            </div>

            <div className=" mt-6">
              <h2 className=" text-2xl font-semibold text-gray-800 mb-3">Job Description</h2>
              <div className="!border-none whitespace-pre-line text-gray-700">{job.description}</div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Requirements</h2>
              <div className="!border-none whitespace-pre-line text-gray-700">{job.requirements}</div>
            </div>

            {job.applicationUrl && (
              <div className="!border-none mt-8">
                <Button className="!border-none flex items-center gap-2" onClick={() => window.open(job.applicationUrl, "_blank")}>
                  Apply Now
                  <ExternalLink size={16} />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 text-white">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
