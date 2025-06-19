"use client"

import { MoreHorizontal, Eye, Clock, Play, Pause, Send, FileText, Calendar, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TaskListProps {
  tasks: Task[]
  onViewDetails: (task: Task) => void
  onViewLogs: (task: Task) => void
  onToggleStatus: (id: string) => void
  onExecute: (id: string) => void
  onRemove: (id: string) => void
}

export default function TaskList({
  tasks,
  onViewDetails,
  onViewLogs,
  onToggleStatus,
  onExecute,
  onRemove,
}: TaskListProps) {
  const { t } = useTranslation()

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Get task type icon with color and background
  const getTaskTypeIcon = (type: string, triggerType: string, name: string) => {
    // 颜色与interactive-calendar/task-calendar.tsx一致，但更高饱和度
    let colorClass = "text-amber-600";
    let bgClass = "bg-amber-100";
    if (triggerType === "Birthday") { colorClass = "text-rose-600"; bgClass = "bg-rose-100"; }
    else if (triggerType === "New Post") { colorClass = "text-indigo-600"; bgClass = "bg-indigo-100"; }
    else if (triggerType === "Regular" && name.toLowerCase().includes("newsletter")) { colorClass = "text-violet-600"; bgClass = "bg-violet-100"; }
    else if (triggerType === "Regular" && name.toLowerCase().includes("promotion")) { colorClass = "text-emerald-600"; bgClass = "bg-emerald-100"; }
    return {
      icon: (() => {
        if (type === "Manual") return <Play className={`h-4 w-4 ${colorClass}`} />
        if (type === "Scheduled") {
          if (triggerType === "Birthday") return <Calendar className={`h-4 w-4 ${colorClass}`} />
          if (triggerType === "Holiday") return <Calendar className={`h-4 w-4 ${colorClass}`} />
          return <Clock className={`h-4 w-4 ${colorClass}`} />
        }
        if (type === "Event") return <Bell className={`h-4 w-4 ${colorClass}`} />
        return <FileText className={`h-4 w-4 ${colorClass}`} />
      })(),
      bgClass
    }
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
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-start space-x-3">
              {(() => {
                const { icon, bgClass } = getTaskTypeIcon(task.type, task.triggerType, task.name);
                return (
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgClass}`}>
                    {icon}
                  </div>
                );
              })()}
              <div>
                <h3 className="font-semibold text-gray-800">{task.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span>{t(`taskType.${task.type}`)}</span>
                  <span>•</span>
                  <span>{t(`triggerType.${task.triggerType}`)}</span>
                  <span>•</span>
                  <span>{task.isRecurring ? t('recurring') : t('oneTime')}</span>
                  <span>•</span>
                  <span>{t('created')}: {formatDate(task.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className={getStatusBadgeColor(task.status)}>{t(`status.${task.status}`)}</Badge>
              <Button variant="outline" size="sm" onClick={() => onViewDetails(task)}>
                <Eye className="mr-1 h-4 w-4" />
                {t('details')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggleStatus(task.id)}
                className={task.isEnabled ? "border-[#FF4D4F] text-[#FF4D4F]" : "border-[#32C48D] text-[#32C48D]"}
              >
                {task.isEnabled ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
                {task.isEnabled ? t('disable') : t('enable')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExecute(task.id)}
                className="border-[#F56DB6] text-[#F56DB6]"
                disabled={!task.isEnabled || task.status === "Completed"}
              >
                <Send className="mr-1 h-4 w-4" />
                {t('sendNow')}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewLogs(task)}>
                    <Clock className="mr-2 h-4 w-4" />
                    {t('taskLogs')}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    {t('edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRemove(task.id)} className="text-[#FF4D4F]">
                    <FileText className="mr-2 h-4 w-4" />
                    {t('delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
