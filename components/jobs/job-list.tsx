"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit, Trash2, MapPin, Building, Clock, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { deleteJob } from "@/lib/job-service"
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

interface JobListProps {
  jobs: Job[]
  loading: boolean
}

export default function JobList({ jobs, loading }: JobListProps) {
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!deleteJobId) return

    setIsDeleting(true)
    try {
      await deleteJob(deleteJobId)
      toast({
        title: "Job deleted",
        description: "The job has been successfully deleted",
      })
      // Refresh the page to update the job list
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error deleting job",
        description: error.message || "Failed to delete the job",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteJobId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No jobs found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search filters or check back later</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            <CardContent className="!border-none p-6">
              <div className="!border-none flex justify-between items-start">
                <div className="!border-none">
                  <h3 className=" text-2xl font-semibold text-blue-800">{job.title}</h3>
                  <div className="!border-none flex flex-wrap items-center gap-2 mt-2 text-gray-500 text-sm">
                    <div className="!border-none flex items-center gap-1">
                      <Building size={16} className="!border-none text-blue-500" />
                      <span className="!border-none">{job.company}</span>
                    </div>
                    <div className="!border-none flex items-center gap-1">
                      <MapPin size={16} className="!border-none text-blue-500" />
                      <span className="!border-none">{job.location}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={`text-xs px-3 py-1 rounded-full ${job.jobType === "Full-time"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600 border border-gray-300"
                    }`}
                >
                  {job.jobType}
                </Badge>
              </div>

              <p className="!border-none mt-4 text-gray-600 text-sm line-clamp-3">{job.description}</p>

              <div className="!border-none flex items-center gap-6 mt-4 text-xs text-gray-400">
                <div className="!border-none flex items-center gap-1">
                  <Clock size={14} className="!border-none text-blue-500" />
                  <span className="!border-none">{job.jobType}</span>
                </div>
                <div className="!border-none flex items-center gap-1">
                  <Calendar size={14} className="!border-none text-blue-500" />
                  <span className="!border-none">
                    Posted{" "}
                    {formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => router.push(`/jobs/${job.id}`)}
              >
                View Details
              </Button>

              {user && user.id === job.userId && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-blue-500 hover:bg-blue-50"
                    onClick={() => router.push(`/jobs/edit/${job.id}`)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => setDeleteJobId(job.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>

        ))}
      </div>

      <AlertDialog open={!!deleteJobId} onOpenChange={(open) => !open && setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
