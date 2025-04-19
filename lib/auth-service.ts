import type { User } from "@/lib/types"

const API_URL = "https://api.example.com" // Replace with your actual API URL

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }

  return data
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  }
}

export const registerUser = async (userData: {
  name: string
  email: string
  password: string
}) => {
  try {
    // For demo purposes, simulate a successful registration
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/sign_up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
    */

    // Simulated response
    return {
      success: true,
      message: "Registration successful",
    }
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

export const loginUser = async (credentials: {
  email: string
  password: string
}) => {
  try {
    // For demo purposes, simulate a successful login
    // In a real app, you would make an API call like this:
    /*
    const response = await fetch(`${API_URL}/sign_in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
    */

    // Simulated response with mock user data and token
    return {
      token: "mock_jwt_token",
      user: {
        id: "user_1",
        name: "Demo User",
        email: credentials.email,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    // For demo purposes, return the user from localStorage
    // In a real app, you would verify the token with the server:
    /*
    const response = await fetch(`${API_URL}/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
    */

    const userJson = localStorage.getItem("user")
    if (!userJson) {
      throw new Error("User not found")
    }

    return JSON.parse(userJson)
  } catch (error) {
    console.error("Get current user error:", error)
    throw error
  }
}
