"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { Template } from "@/types/template"
import TaskDetails from "@/components/task-automation/task-details"
import type { Task } from "@/types/task"
import { mockTasks } from "./smart-content"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { Badge } from "@/components/ui/badge"

// 高真实度 Related Tasks 假数据生成
const fakeFanIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const fakeChannels = ["Email", "Instagram", "Line", "X (Twitter)", "WhatsApp"];
const fakeStatuses = ["Active", "Completed", "Disabled"];
const fakeNames = [
  "Notify VIP Fans about New Content", "Content Drop for All Fans", "Special Content Alert", "Premium Content Push", "Morning Content Drop", "Evening Update", "Exclusive Content Alert", "Fan Appreciation Post", "Content Reminder", "All Fans Content Push", "Birthday Blast", "Donation Thank You", "Weekly Recap", "VIP Only Content", "Fan Q&A Invite", "Promotion Announcement"
];

interface RelatedTasksProps {
  template: Template
  tasks?: Task[]
  onClose: () => void
}

export default function RelatedTasks({ template, tasks, onClose }: RelatedTasksProps) {
  const { t } = useTranslation()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  // 展示传入tasks或mockTasks
  const displayTasks = tasks && tasks.length > 0 ? tasks : mockTasks.filter(t => t.templateId === template.id)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('relatedTasks')}</DialogTitle>
          <DialogDescription>Tasks using the "{template.name}" template</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent min-h-0">
          {displayTasks.length > 0 ? (
            displayTasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm flex flex-col min-h-[140px] h-full">
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base truncate pr-2" title={task.name}>{task.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 whitespace-nowrap">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(task.createdAt)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-gray-400 mb-3 max-w-full break-all">
                    {task.channels?.map((ch) => (
                      <span key={ch} className="bg-gray-100 rounded px-2 py-0.5" title={ch}>{ch}</span>
                    ))}
                    <Badge>{t(`status.${task.status}`)}</Badge>
                  </div>
                  <div className="flex justify-end mt-auto pt-2">
                    <Button variant="outline" size="sm" className="px-2 py-1 h-7" onClick={() => setSelectedTask(task)}>
                      <Calendar className="mr-1 h-4 w-4" />
                      {t('viewTask')}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 col-span-2">
              <p className="text-sm text-gray-500">{t('noRelatedTasks')}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onViewLogs={() => {}}
          onToggleStatus={() => {}}
          onExecute={() => {}}
          onRemove={() => setSelectedTask(null)}
        />
      )}
    </Dialog>
  )
}
