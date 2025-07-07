"use client"
import EngageHub from "@/components/engage-hub/engage-hub"
import AccessGuard from "@/components/ui/access-guard"

export default function EngageHubPage() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <EngageHub />
    </AccessGuard>
  )
} 