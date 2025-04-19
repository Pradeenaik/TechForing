import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import HomePage from "@/components/home/home-page"

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/auth/login")
  }

  return <HomePage />
}