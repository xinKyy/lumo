"use client"
import SmartContent from "@/components/smart-content/smart-content"
import AccessGuard from "@/components/ui/access-guard"

export default function SmartContentPage() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <SmartContent />
    </AccessGuard>
  )
} 