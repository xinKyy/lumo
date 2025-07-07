"use client"
import TaskAutomation from "@/components/task-automation/task-automation"
import AccessGuard from "@/components/ui/access-guard"

export default function TaskAutomationPage() {
  return (
    <AccessGuard disabledForBusiness={true}>
      <TaskAutomation />
    </AccessGuard>
  )
} 