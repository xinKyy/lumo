"use client"
import FansDatabase from "@/components/fans-database/fans-database"
import AccessGuard from "@/components/ui/access-guard"

export default function FansDatabasePage() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <FansDatabase />
    </AccessGuard>
  )
} 