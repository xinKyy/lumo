"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AppRoot() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check user type and redirect accordingly
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType')
      
      if (userType === 'business') {
        // Business users go to creator database
        router.push('/creator-database')
      } else {
        // Other users go to dashboard
        router.push('/dashboard')
      }
    }
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#7A3CEF]" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null
} 