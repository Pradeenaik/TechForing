import type { Job } from "@/lib/types"

const API_URL = "https://api.example.com" // Replace with your actual API URL

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
}

// Mock data for demo purposes
let MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "New York",
    jobType: "Full-time",
    salary: "$80,000 - $100,000",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing web designs.",
    requirements:
      "- 3+ years of experience with React\n- Strong JavaScript skills\n- Experience with responsive design\n- Knowledge of modern frontend tools",
    applicationUrl: "https://example.com/apply",
    userId: "user_1",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "Data Systems",
    location: "Remote",
    jobType: "Full-time",
    salary: "$90,000 - $120,000",
    description: "Join our backend team to build scalable APIs and services that power our applications.",
    requirements:
      "- Experience with Node.js and Express\n- Knowledge of database design\n- Understanding of RESTful API principles\n- Familiarity with cloud services",
    applicationUrl: "https://example.com/apply",
    userId: "user_2",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Creative Agency",
    location: "San Francisco",
    jobType: "Contract",
    salary: "$70 - $90 per hour",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients.",
    requirements:
      "- Portfolio demonstrating UI design skills\n- Experience with Figma or Sketch\n- Understanding of user-centered design principles\n- Ability to create wireframes and prototypes",
    applicationUrl: "https://example.com/apply",
    userId: "user_3",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
]

export const getAllJobs = async (): Promise<Job[]> => {
  try {
    // For demo purposes, return mock data
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/jobs`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch jobs");
    }
    return data;
    */

    return MOCK_JOBS
  } catch (error) {
    console.error("Get all jobs error:", error)
    throw error
  }
}

export const getJobById = async (id: string): Promise<Job> => {
  try {
    // For demo purposes, find job in mock data
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      headers: getAuthHeaders(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch job");
    }
    return data;
    */

    const job = MOCK_JOBS.find((job) => job.id === id)
    if (!job) {
      throw new Error("Job not found")
    }

    return job
  } catch (error) {
    console.error("Get job by id error:", error)
    throw error
  }
}

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  try {
    // For demo purposes, add to mock data
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create job");
    }
    return data;
    */

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const newJob: Job = {
      id: String(MOCK_JOBS.length + 1),
      title: jobData.title || "",
      company: jobData.company || "",
      location: jobData.location || "",
      jobType: jobData.jobType || "Full-time",
      salary: jobData.salary || "",
      description: jobData.description || "",
      requirements: jobData.requirements || "",
      applicationUrl: jobData.applicationUrl || "",
      userId: user.id || "user_1",
      createdAt: new Date().toISOString(),
    }

    MOCK_JOBS.push(newJob)
    return newJob
  } catch (error) {
    console.error("Create job error:", error)
    throw error
  }
}

export const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
  try {
    // For demo purposes, update mock data
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update job");
    }
    return data;
    */

    const index = MOCK_JOBS.findIndex((job) => job.id === id)
    if (index === -1) {
      throw new Error("Job not found")
    }

    MOCK_JOBS[index] = { ...MOCK_JOBS[index], ...jobData }
    return MOCK_JOBS[index]
  } catch (error) {
    console.error("Update job error:", error)
    throw error
  }
}

// Add this helper to simulate network delay
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 300));

export const deleteJob = async (id: string): Promise<void> => {
  try {
    // For mock data implementation
    const initialLength = MOCK_JOBS.length;
    MOCK_JOBS = MOCK_JOBS.filter(job => job.id !== id);
    
    if (MOCK_JOBS.length === initialLength) {
      throw new Error("Job not found");
    }

    // For real API implementation (uncomment when needed):
    /*
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete job");
    }
    */
  } catch (error) {
    console.error("Delete job error:", error);
    throw error;
  }
};