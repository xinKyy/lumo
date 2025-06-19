"use client"

import { Send, Calendar, Trash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TaskDetailModalProps {
  task: Task
  onClose: () => void
  onDelete: () => void
}

export default function TaskDetailModal({ task, onClose, onDelete }: TaskDetailModalProps) {
  const { t } = useTranslation()

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#32C48D] text-white"
      case "Completed":
        return "bg-[#7A3CEF] text-white"
      case "Failed":
        return "bg-[#FF4D4F] text-white"
      case "Disabled":
        return "bg-gray-400 text-white"
      case "In Progress":
        return "bg-[#FFB300] text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{task.name}</span>
          </DialogTitle>
          <DialogDescription>{t('taskDetails')}</DialogDescription>
          <Badge className={getStatusBadgeColor(task.status) + " mt-2 w-fit"}>{t(task.status.toLowerCase())}</Badge>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">{t('scheduledTime')}</div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{formatDate(task.scheduledDate)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-500">{t('taskType')}</div>
              <div>
                {t(task.type.toLowerCase())} ({t(task.triggerType.toLowerCase())})
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-gray-500">{t('targetFans')}</div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{task.targetFans.length} {t('fans')}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-gray-500">{t('channels')}</div>
            <div className="flex flex-wrap gap-2">
              {task.channels.map((channel, index) => (
                <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                  {t(channel.toLowerCase())}
                </Badge>
              ))}
            </div>
          </div>

          {task.notes && (
            <div className="space-y-1">
              <div className="text-sm text-gray-500">{t('notes')}</div>
              <div className="rounded-md bg-gray-50 p-2 text-sm">{task.notes}</div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" className="text-[#FF4D4F]" onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            {t('delete')}
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              {t('viewDetails')}
            </Button>
            <Button className="btn-primary">
              <Send className="mr-2 h-4 w-4" />
              {t('sendNow')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
