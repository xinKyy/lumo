"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Lightbulb, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import WeeklyFocus from "./weekly-focus"
import TaskCalendar from "./task-calendar"
import InteractionTabs from "./interaction-tabs"
import FanActivityTrend from "./fan-activity-trend"
import TaskDetailModal from "./task-detail-modal"
import CreateTaskForm from "@/components/task-automation/create-task-form"
import CreateTemplateForm from "@/components/smart-content/create-template-form"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Sample data for demonstration
const today = new Date();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();

export default function InteractiveCalendar() {
  const { t, i18n } = useTranslation()
  const [showWeeklyFocus, setShowWeeklyFocus] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)

  // Mock data based on current language
  const sampleTasks: Task[] = i18n.language === 'ja' ? [
    {
      id: "1",
      name: "誕生日のお祝い",
      type: "Scheduled",
      triggerType: "Birthday",
      isRecurring: true,
      channels: ["Email", "Line"],
      timezone: "Personalized",
      notes: "ファンの誕生日に誕生日のお祝いを送信",
      targetFans: ["1", "2", "3"],
      templateId: "1",
      createdAt: "2023-04-15T10:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate()).toISOString(), // Today
    },
    {
      id: "2",
      name: "新コンテンツ通知",
      type: "Event",
      triggerType: "New Post",
      isRecurring: false,
      channels: ["X (Twitter)", "Instagram"],
      timezone: "UTC",
      notes: "新コンテンツ投稿時にファンに通知",
      targetFans: ["1", "3"],
      templateId: "2",
      createdAt: "2023-05-10T14:45:00Z",
      isEnabled: true,
      status: "Completed",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() + 2).toISOString(), // Day after tomorrow
    },
    {
      id: "3",
      name: "週刊ニュースレター",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email"],
      timezone: "UTC",
      notes: "全ファンに週次更新を送信",
      targetFans: ["1", "2", "3"],
      templateId: "3",
      createdAt: "2023-03-22T09:15:00Z",
      isEnabled: false,
      status: "Disabled",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() - 1).toISOString(), // Yesterday
    },
    {
      id: "4",
      name: "特別プロモーション",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: false,
      channels: ["Email", "X (Twitter)"],
      timezone: "UTC",
      notes: "VIPファンに特別プロモーションを送信",
      targetFans: ["1"],
      templateId: "1",
      createdAt: "2023-05-15T09:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() + 5).toISOString(), // 5 days from now
    },
    {
      id: "5",
      name: "VIPライブ配信",
      type: "Event",
      triggerType: "Live",
      isRecurring: false,
      channels: ["YouTube", "Twitch"],
      timezone: "UTC",
      notes: "VIPファン専用ライブ配信",
      targetFans: ["2", "3"],
      templateId: "4",
      createdAt: "2023-05-01T12:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 3).toISOString(),
    },
    {
      id: "6",
      name: "アンケートフィードバック",
      type: "Event",
      triggerType: "Survey",
      isRecurring: false,
      channels: ["Email"],
      timezone: "UTC",
      notes: "ファンからフィードバックを収集",
      targetFans: ["1", "2", "3"],
      templateId: "5",
      createdAt: "2023-05-02T08:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 7).toISOString(),
    },
    {
      id: "7",
      name: "システムメンテナンス",
      type: "System",
      triggerType: "Maintenance",
      isRecurring: false,
      channels: ["Email", "App"],
      timezone: "UTC",
      notes: "ユーザーにメンテナンス予定を通知",
      targetFans: ["all"],
      templateId: "6",
      createdAt: "2023-05-03T10:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 10).toISOString(),
    },
    {
      id: "8",
      name: "誕生日のお祝い",
      type: "Scheduled",
      triggerType: "Birthday",
      isRecurring: true,
      channels: ["Email"],
      timezone: "Personalized",
      notes: "ファンの誕生日に誕生日のお祝いを送信",
      targetFans: ["4"],
      templateId: "1",
      createdAt: "2023-04-15T10:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 15).toISOString(),
    },
    {
      id: "9",
      name: "月次レポート",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email"],
      timezone: "UTC",
      notes: "全ファンに月次レポートを送信",
      targetFans: ["1", "2", "3", "4"],
      templateId: "7",
      createdAt: "2023-05-05T09:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 28).toISOString(),
    },
    {
      id: "10",
      name: "新コンテンツ通知",
      type: "Event",
      triggerType: "New Post",
      isRecurring: false,
      channels: ["Instagram"],
      timezone: "UTC",
      notes: "新コンテンツ投稿時にファンに通知",
      targetFans: ["2"],
      templateId: "2",
      createdAt: "2023-05-10T14:45:00Z",
      isEnabled: true,
      status: "Completed",
      scheduledDate: new Date(thisYear, thisMonth, 12).toISOString(),
    },
    {
      id: "11",
      name: "特別プロモーション",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: false,
      channels: ["Email"],
      timezone: "UTC",
      notes: "全ファンに特別プロモーションを送信",
      targetFans: ["all"],
      templateId: "1",
      createdAt: "2023-05-15T09:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 25).toISOString(),
    },
    {
      id: "12",
      name: "週刊ニュースレター",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email", "Line"],
      timezone: "UTC",
      notes: "全ファンに週次ニュースレターを送信",
      targetFans: ["1", "2", "3", "4"],
      templateId: "3",
      createdAt: "2023-05-08T11:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 30).toISOString(),
    },
  ] : [
    {
      id: "1",
      name: "Birthday Wishes",
      type: "Scheduled",
      triggerType: "Birthday",
      isRecurring: true,
      channels: ["Email", "Line"],
      timezone: "Personalized",
      notes: "Send birthday wishes to fans on their birthday",
      targetFans: ["1", "2", "3"],
      templateId: "1",
      createdAt: "2023-04-15T10:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate()).toISOString(), // Today
    },
    {
      id: "2",
      name: "New Content Notification",
      type: "Event",
      triggerType: "New Post",
      isRecurring: false,
      channels: ["X (Twitter)", "Instagram"],
      timezone: "UTC",
      notes: "Notify fans when new content is posted",
      targetFans: ["1", "3"],
      templateId: "2",
      createdAt: "2023-05-10T14:45:00Z",
      isEnabled: true,
      status: "Completed",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() + 2).toISOString(), // Day after tomorrow
    },
    {
      id: "3",
      name: "Weekly Newsletter",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email"],
      timezone: "UTC",
      notes: "Send weekly updates to all fans",
      targetFans: ["1", "2", "3"],
      templateId: "3",
      createdAt: "2023-03-22T09:15:00Z",
      isEnabled: false,
      status: "Disabled",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() - 1).toISOString(), // Yesterday
    },
    {
      id: "4",
      name: "Special Promotion",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: false,
      channels: ["Email", "X (Twitter)"],
      timezone: "UTC",
      notes: "Send special promotion to VIP fans",
      targetFans: ["1"],
      templateId: "1",
      createdAt: "2023-05-15T09:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, today.getDate() + 5).toISOString(), // 5 days from now
    },
    {
      id: "5",
      name: "VIP Live Stream",
      type: "Event",
      triggerType: "Live",
      isRecurring: false,
      channels: ["YouTube", "Twitch"],
      timezone: "UTC",
      notes: "Exclusive live stream for VIP fans",
      targetFans: ["2", "3"],
      templateId: "4",
      createdAt: "2023-05-01T12:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 3).toISOString(),
    },
    {
      id: "6",
      name: "Survey Feedback",
      type: "Event",
      triggerType: "Survey",
      isRecurring: false,
      channels: ["Email"],
      timezone: "UTC",
      notes: "Collect feedback from fans",
      targetFans: ["1", "2", "3"],
      templateId: "5",
      createdAt: "2023-05-02T08:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 7).toISOString(),
    },
    {
      id: "7",
      name: "System Maintenance",
      type: "System",
      triggerType: "Maintenance",
      isRecurring: false,
      channels: ["Email", "App"],
      timezone: "UTC",
      notes: "Notify users of scheduled maintenance",
      targetFans: ["all"],
      templateId: "6",
      createdAt: "2023-05-03T10:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 10).toISOString(),
    },
    {
      id: "8",
      name: "Birthday Wishes",
      type: "Scheduled",
      triggerType: "Birthday",
      isRecurring: true,
      channels: ["Email"],
      timezone: "Personalized",
      notes: "Send birthday wishes to fans on their birthday",
      targetFans: ["4"],
      templateId: "1",
      createdAt: "2023-04-15T10:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 15).toISOString(),
    },
    {
      id: "9",
      name: "Monthly Recap",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email"],
      timezone: "UTC",
      notes: "Send monthly recap to all fans",
      targetFans: ["1", "2", "3", "4"],
      templateId: "7",
      createdAt: "2023-05-05T09:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 28).toISOString(),
    },
    {
      id: "10",
      name: "New Content Notification",
      type: "Event",
      triggerType: "New Post",
      isRecurring: false,
      channels: ["Instagram"],
      timezone: "UTC",
      notes: "Notify fans when new content is posted",
      targetFans: ["2"],
      templateId: "2",
      createdAt: "2023-05-10T14:45:00Z",
      isEnabled: true,
      status: "Completed",
      scheduledDate: new Date(thisYear, thisMonth, 12).toISOString(),
    },
    {
      id: "11",
      name: "Special Promotion",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: false,
      channels: ["Email"],
      timezone: "UTC",
      notes: "Send special promotion to all fans",
      targetFans: ["all"],
      templateId: "1",
      createdAt: "2023-05-15T09:30:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 25).toISOString(),
    },
    {
      id: "12",
      name: "Weekly Newsletter",
      type: "Scheduled",
      triggerType: "Regular",
      isRecurring: true,
      channels: ["Email", "Line"],
      timezone: "UTC",
      notes: "Send weekly newsletter to all fans",
      targetFans: ["1", "2", "3", "4"],
      templateId: "3",
      createdAt: "2023-05-08T11:00:00Z",
      isEnabled: true,
      status: "Active",
      scheduledDate: new Date(thisYear, thisMonth, 30).toISOString(),
    },
  ]

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetail(true)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowCreateTask(true)
  }

  const handleCreateTask = (task: Task) => {
    // Here you would typically add the task to your state or database
    console.log("Task created:", task)
    setShowCreateTask(false)
  }

  const handleDeleteTask = (taskId: string) => {
    // Here you would typically delete the task from your state or database
    console.log("Task deleted:", taskId)
    setShowTaskDetail(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{t('Interactive Calendar')}</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Left column (70%) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Weekly Focus (collapsible) */}
          <div className="rounded-lg shadow-sm">
            <div
              className="flex cursor-pointer items-center justify-between bg-[#FFF8E6] rounded-md p-4"
              onClick={() => setShowWeeklyFocus(!showWeeklyFocus)}
            >
              <div className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-[#FFB300]" />
                <h3 className="text-lg font-medium">{t('Weekly Operation Focus')}</h3>
              </div>
              <Button variant="ghost" size="sm">
                {showWeeklyFocus ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            {showWeeklyFocus && <WeeklyFocus onCreateTask={() => setShowCreateTask(true)} onCreateTemplate={() => setShowCreateTemplate(true)} />}
          </div>

          {/* Task Calendar */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">{t('Task Calendar')}</h3>
            <TaskCalendar tasks={sampleTasks} onTaskClick={handleTaskClick} onDateClick={handleDateClick} />
          </div>
        </div>

        {/* Right column (30%) - 改为上下布局 */}
        <div className="space-y-6 lg:col-span-3 flex flex-col">
          {/* Interaction Tabs */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <InteractionTabs onCreateTask={() => setShowCreateTask(true)} />
          </div>

          {/* Fan Activity Trend */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-medium">{t('Fan Activity Trend')}</h3>
            <FanActivityTrend />
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {showTaskDetail && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setShowTaskDetail(false)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
        />
      )}

      {/* Create Task Form */}
      {showCreateTask && (
        <CreateTaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateTask(false)}
          initialDate={selectedDate}
        />
      )}

      {/* Create Template Form */}
      {showCreateTemplate && (
        <CreateTemplateForm
          onSubmit={() => setShowCreateTemplate(false)}
          onCancel={() => setShowCreateTemplate(false)}
        />
      )}
    </div>
  )
}
