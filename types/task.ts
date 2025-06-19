export interface Task {
  id: string
  name: string
  type: string
  triggerType: string
  isRecurring: boolean
  channels: string[]
  timezone: string
  notes: string
  targetFans: string[]
  templateId: string
  createdAt: string
  isEnabled: boolean
  status: string
  scheduledDate: string
}
