"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
      <form
        onSubmit={handleSearch}
        className="!border-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {/* Search input */}
        <div className="!border-none relative">
          <Search className="!border-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search jobs..."
            className=" pl-10 focus:ring-2 focus:ring-indigo-500 transition"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Job Type Select */}
        <div >
          <Select
            value={filters.jobType}
            onValueChange={(value) => handleChange("jobType", value)}
          >
            <SelectTrigger className="focus:ring-2 focus:ring-indigo-500 transition">
              <SelectValue className="!border-none" placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="!border-none" value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Select */}
        <div >
          <Select
            value={filters.location}
            onValueChange={(value) => handleChange("location", value)}
          >
            <SelectTrigger className="focus:ring-2 focus:ring-indigo-500 transition">
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

        {/* Filter Button */}
        <div className="!border-none flex justify-end sm:justify-start">
          <Button
            type="submit"
            className="!border-none w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition rounded-lg shadow-sm"
          >
            Filter Results
          </Button>
        </div>
      </form>
    </div>
  )
}
