"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createJob } from "@/lib/job-service"
import { useToast } from "@/hooks/use-toast"

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    description: "",
    requirements: "",
    applicationUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createJob(formData)
      toast({
        title: "Job created",
        description: "Your job has been posted successfully",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error creating job",
        description: error.message || "Failed to create job",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="!border-none">
            <CardTitle className="!border-none text-2xl">Post a New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="!border-none mt-2 space-y-6">
              <div className="!border-none space-y-2">
                <Label className="!border-none" htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="!border-none grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="!border-none space-y-2">
                  <Label className="!border-none" htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="!border-none space-y-2">
                  <Label className="!border-none" htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. New York or Remote"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="!border-none grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="!border-none space-y-2">
                  <Label className="!border-none" htmlFor="jobType">Job Type</Label>
                  <Select value={formData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
                    <SelectTrigger id="jobType">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="!border-none space-y-2">
                  <Label className="!border-none" htmlFor="salary">Salary (optional)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $50,000 - $70,000"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="!border-none space-y-2">
                <Label className="!border-none" htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <div className="!border-none space-y-2">
                <Label className="!border-none" htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the skills, experience, and qualifications required..."
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="!border-none space-y-2">
                <Label className="!border-none" htmlFor="applicationUrl">Application URL (optional)</Label>
                <Input
                  id="applicationUrl"
                  name="applicationUrl"
                  placeholder="e.g. https://yourcompany.com/careers/apply"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="!border-none flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
