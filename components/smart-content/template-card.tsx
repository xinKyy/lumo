"use client"

import { MoreHorizontal, Eye, Play, ListChecks, Edit, Trash, Sparkles, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CreateTaskForm from "@/components/task-automation/create-task-form"
import { useState } from "react"
import type { Template } from "@/types/template"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TemplateCardProps {
  template: Template
  onViewDetails: () => void
  onViewRelatedTasks: () => void
  onRemove: () => void
  relatedTasksCount: number
}

export default function TemplateCard({
  template,
  onViewDetails,
  onViewRelatedTasks,
  onRemove,
  relatedTasksCount,
}: TemplateCardProps) {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const { t } = useTranslation()

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleCreateTask = (task: Task) => {
    // Here you would typically save the task to your backend
    setShowCreateTask(false)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="truncate text-lg font-semibold">{template.name}</CardTitle>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={`whitespace-nowrap ${
                  template.type === "AI Generated"
                    ? "bg-violet-100 text-violet-700"
                    : template.type === "Custom"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-[#F5F5F5] text-[#F56DB6]"
                }`}
              >
                {template.type === "AI Generated" ? (
                  <Sparkles className="mr-1 h-3 w-3 text-violet-700" />
                ) : template.type === "Custom" ? (
                  <FileText className="mr-1 h-3 w-3 text-yellow-700" />
                ) : (
                  <FileText className="mr-1 h-3 w-3 text-[#F56DB6]" />
                )}
                {template.type}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewDetails}>
                    <Eye className="mr-2 h-4 w-4" />
                    {t('viewDetails')}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    {t('edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onRemove} className="text-[#FF4D4F]">
                    <Trash className="mr-2 h-4 w-4" />
                    {t('delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {t('created')}: {formatDate(template.createdAt)}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-2 text-sm text-gray-600">{template.content}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2 pt-2">
          <Button
            size="sm"
            className="border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
            variant="outline"
            onClick={() => setShowCreateTask(true)}
          >
            <Play className="mr-1 h-4 w-4" />
            {t("useTemplate")}
          </Button>
          <div className="flex justify-between gap-2">
            <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1">
              <Eye className="mr-1 h-4 w-4" />
              {t("view")}
            </Button>
            <Button variant="outline" size="sm" onClick={onViewRelatedTasks} className="flex-1">
              <ListChecks className="mr-1 h-4 w-4" />
              {t("tasks")} ({relatedTasksCount})
            </Button>
          </div>
        </CardFooter>
      </Card>

      {showCreateTask && (
        <CreateTaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateTask(false)}
          initialTemplate={template}
        />
      )}
    </>
  )
}
