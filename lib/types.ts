export interface User {
    id: string
    name: string
    email: string
  }
  
  export interface Job {
    id: string
    title: string
    company: string
    location: string
    jobType: string
    salary?: string
    description: string
    requirements: string
    applicationUrl?: string
    userId: string
    createdAt: string
  }
  