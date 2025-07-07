"use client"
import InteractiveCalendar from "@/components/interactive-calendar/interactive-calendar"
import AccessGuard from "@/components/ui/access-guard"

export default function InteractiveCalendarPage() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <InteractiveCalendar />
    </AccessGuard>
  )
} 