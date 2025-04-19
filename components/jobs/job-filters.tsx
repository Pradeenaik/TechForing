"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobFiltersProps {
  onFilter: (filters: any) => void
}

export default function JobFilters({ onFilter }: JobFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    jobType: "all",
    location: "all",
  })

  const handleChange = (name: string, value: string) => {
    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    onFilter(updatedFilters)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filters)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        <div>
          <Select value={filters.jobType} onValueChange={(value) => handleChange("jobType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={filters.location} onValueChange={(value) => handleChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="San Francisco">San Francisco</SelectItem>
              <SelectItem value="London">London</SelectItem>
              <SelectItem value="Berlin">Berlin</SelectItem>
              <SelectItem value="Tokyo">Tokyo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Filter Results</Button>
      </form>
    </div>
  )
}
