"use client"

import { CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TaskLog {
  id: string
  taskId: string
  executionTime: string
  status: string
  reachedFans: number
  totalFans: number
  details: string
}

interface TaskLogsProps {
  task: Task
  logs: TaskLog[]
  onClose: () => void
}

export default function TaskLogs({ task, logs, onClose }: TaskLogsProps) {
  const { t } = useTranslation()
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case t('status.Success'):
      case 'Success':
        return <CheckCircle className="h-5 w-5 text-[#32C48D]" />
      case t('status.Partial'):
      case 'Partial':
        return <AlertCircle className="h-5 w-5 text-[#FFB300]" />
      case t('status.Failed'):
      case 'Failed':
        return <AlertCircle className="h-5 w-5 text-[#FF4D4F]" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-[#32C48D] text-white"
      case "Partial":
        return "bg-[#FFB300] text-white"
      case "Failed":
        return "bg-[#FF4D4F] text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  // 获取状态的本地化 key
  const getStatusI18nKey = (status: string) => {
    switch (status) {
      case 'Success':
        return 'status.Completed'
      case 'Partial':
        return 'status.Partial'
      case 'Failed':
        return 'status.Failed'
      case '部分':
        return 'status.Partial'
      default:
        return status
    }
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-3xl overflow-y-auto sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-3">
            <span>{t('taskLogs')}: {task.name}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(log.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadgeColor(log.status)}>{t(getStatusI18nKey(log.status))}</Badge>
                          <span className="text-sm text-gray-500">{formatDate(log.executionTime)}</span>
                        </div>
                        <div className="mt-1 text-sm">
                          {t('reached')} {log.reachedFans} {t('of')} {log.totalFans} {t('fans')}
                        </div>
                      </div>
                    </div>
                  </div>
                  {log.details && <div className="mt-3 text-sm text-gray-600">{log.details}</div>}
                </div>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">{t('noLogsAvailable')}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              {t('close', 'Close')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
