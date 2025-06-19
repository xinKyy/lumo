"use client"

import { useState, useEffect, useMemo } from "react"
import { PlusCircle, Search, Filter, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TaskList from "./task-list"
import CreateTaskForm from "./create-task-form"
import TaskDetails from "./task-details"
import TaskLogs from "./task-logs"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import React from "react"

// Sample data for demonstration
const sampleTasks: Task[] = [
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
    scheduledDate: "2023-04-15T10:30:00Z",
    isEnabled: true,
    status: "Active",
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
    scheduledDate: "2023-05-10T14:45:00Z",
    isEnabled: true,
    status: "Completed",
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
    scheduledDate: "2023-03-22T09:15:00Z",
    isEnabled: false,
    status: "Disabled",
  },
  // 新增12条更真实的任务名称
  ...[
    "Send Welcome Message to New Fans",
    "Announce Fan of the Month",
    "Collect Fan Feedback",
    "Invite Fans to Live Stream",
    "Share Exclusive Content with VIPs",
    "Remind Fans About Upcoming Event",
    "Thank Top Supporters",
    "Request Fan Stories for Newsletter",
    "Poll Fans for Next Content Topic",
    "Send Birthday Coupon to Fans",
    "Promote Fan Art Submission",
    "Invite Fans to Q&A Session",
  ].map((name, i) => {
    const id = (4 + i).toString();
    const date = `2023-05-${(10 + i).toString().padStart(2, "0")}T0${i % 10}:00:00Z`;
    return {
      id,
      name,
      type: ["Scheduled", "Event"][i % 2],
      triggerType: ["Regular", "Birthday", "New Post"][i % 3],
      isRecurring: i % 2 === 0,
      channels: ["Email", "Line", "Instagram", "X (Twitter)", "WhatsApp"].slice(0, (i % 5) + 1),
      timezone: ["UTC", "Personalized"][i % 2],
      notes: `Auto-generated task ${id}`,
      targetFans: ["1", "2", "3"].slice(0, (i % 3) + 1),
      templateId: ((i % 3) + 1).toString(),
      createdAt: date,
      scheduledDate: date,
      isEnabled: i % 3 !== 0,
      status: ["Active", "Completed", "Disabled"][i % 3],
    }
  }),
]

// 丰富、真实的 Task Logs 假数据（每条 task 3-5 条日志，并列出所有触达粉丝）
const fakeFanNames = [
  "JennyLove", "MikeRunner", "SakuraChan", "LilyStar", "TommyLee", "AnnaBlue", "ChrisGreen", "SamOcean", "MiaSun", "LeoKing", "NinaSky", "OscarWave", "Paulina", "Fan14", "Fan15", "Fan16", "Fan17", "Fan18", "Fan19", "Fan20"
];

const sampleTaskLogs = sampleTasks.flatMap((task, idx) => {
  // 每条 task 3-5 条日志
  const logCount = 3 + (idx % 3); // 3~5 条
  const fanCount = task.targetFans?.length || 1;
  // 随机分配粉丝
  const fans = fakeFanNames.slice(idx, idx + fanCount);
  return Array.from({ length: logCount }).map((_, logIdx) => {
    const statusArr = ["Success", "Partial", "Failed"];
    const status = statusArr[(idx + logIdx) % 3];
    const reached = status === "Failed" ? 0 : Math.max(1, fanCount - (logIdx % 2));
    const reachedFans = fans.slice(0, reached);
    const failedFans = fans.slice(reached);
    let details = "";
    if (status === "Success") {
      details = `All ${reachedFans.length} fans received the message: ${reachedFans.join(", ")}.`;
    } else if (status === "Partial") {
      details = `${reachedFans.length} fans reached: ${reachedFans.join(", ")}. ${failedFans.length} failed: ${failedFans.join(", ")}.`;
    } else {
      details = `No fans reached. Failed fans: ${failedFans.join(", ") || fans.join(", ")}.`;
    }
    return {
      id: `${task.id}-${logIdx + 1}`,
      taskId: task.id,
      executionTime: `2023-05-${(10 + idx + logIdx).toString().padStart(2, "0")}T${8 + logIdx}:00:00Z`,
      status,
      reachedFans: reachedFans.length,
      totalFans: fanCount,
      fans: reachedFans,
      details,
    };
  });
});

// 组件外部定义基础 mock 任务名和结构
const baseTaskNames = [
  "Send Welcome Message to New Fans",
  "Announce Fan of the Month",
  "Collect Fan Feedback",
  "Invite Fans to Live Stream",
  "Share Exclusive Content with VIPs",
  "Remind Fans About Upcoming Event",
  "Thank Top Supporters",
  "Request Fan Stories for Newsletter",
  "Poll Fans for Next Content Topic",
  "Send Birthday Coupon to Fans",
  "Promote Fan Art Submission",
  "Invite Fans to Q&A Session",
];

function buildMockTasks(names: string[]) {
  return names.map((name, i) => {
    const id = (4 + i).toString();
    const date = `2023-05-${(10 + i).toString().padStart(2, "0")}T0${i % 10}:00:00Z`;
    return {
      id,
      name,
      type: ["Scheduled", "Event"][i % 2],
      triggerType: ["Regular", "Birthday", "New Post"][i % 3],
      isRecurring: i % 2 === 0,
      channels: ["Email", "Line", "Instagram", "X (Twitter)", "WhatsApp"].slice(0, (i % 5) + 1),
      timezone: ["UTC", "Personalized"][i % 2],
      notes: `Auto-generated task ${id}`,
      targetFans: ["1", "2", "3"].slice(0, (i % 3) + 1),
      templateId: ((i % 3) + 1).toString(),
      createdAt: date,
      scheduledDate: date,
      isEnabled: i % 3 !== 0,
      status: ["Active", "Completed", "Disabled"][i % 3],
    }
  })
}

export default function TaskAutomation() {
  const { t, i18n } = useTranslation()
  // 多语言任务名
  const taskNameMap = {
    en: [
      "Send Welcome Message to New Fans",
      "Announce Fan of the Month",
      "Collect Fan Feedback",
      "Invite Fans to Live Stream",
      "Share Exclusive Content with VIPs",
      "Remind Fans About Upcoming Event",
      "Thank Top Supporters",
      "Request Fan Stories for Newsletter",
      "Poll Fans for Next Content Topic",
      "Send Birthday Coupon to Fans",
      "Promote Fan Art Submission",
      "Invite Fans to Q&A Session",
    ],
    ja: [
      "新規ファンへのウェルカムメッセージ送信",
      "今月のファン発表",
      "ファンフィードバック収集",
      "ライブ配信への招待",
      "VIP限定コンテンツ共有",
      "イベント直前リマインド",
      "トップサポーターに感謝",
      "ニュースレター用ファンストーリー募集",
      "次回コンテンツ投票",
      "誕生日クーポン送付",
      "ファンアート募集告知",
      "Q&Aセッション招待",
    ],
    zh: [
      "发送欢迎信息给新粉丝",
      "宣布本月粉丝",
      "收集粉丝反馈",
      "邀请粉丝参加直播",
      "与VIP分享专属内容",
      "活动前提醒",
      "感谢顶级支持者",
      "征集新闻通讯粉丝故事",
      "为下期内容投票",
      "发送生日优惠券",
      "推广粉丝艺术投稿",
      "邀请粉丝参加问答会",
    ]
  }

  // 用 useMemo 生成当前语言的任务列表
  const tasksByLang = useMemo(() => {
    const lang = i18n.language in taskNameMap ? i18n.language : 'en';
    return buildMockTasks(taskNameMap[lang] || baseTaskNames)
  }, [i18n.language])

  // 用 useState 初始化
  const [tasks, setTasks] = useState<Task[]>(tasksByLang)

  // 监听语言变化自动同步
  useEffect(() => {
    setTasks(tasksByLang)
  }, [tasksByLang])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetails, setShowTaskDetails] = useState(false)
  const [showTaskLogs, setShowTaskLogs] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const handleCreateTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: (tasks.length + 1).toString() }])
    setShowCreateForm(false)
  }

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task)
    setShowTaskDetails(true)
  }

  const handleViewLogs = (task: Task) => {
    setSelectedTask(task)
    setShowTaskLogs(true)
  }

  const handleToggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const isEnabled = !task.isEnabled
          return {
            ...task,
            isEnabled,
            status: isEnabled ? (task.status === "Disabled" ? "Active" : task.status) : "Disabled",
          }
        }
        return task
      }),
    )
  }

  const handleExecuteTask = (id: string) => {
    // Simulate task execution
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: "Completed",
          }
        }
        return task
      }),
    )
  }

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    if (selectedTask?.id === id) {
      setShowTaskDetails(false)
      setShowTaskLogs(false)
    }
  }

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "enabled" && task.isEnabled) ||
      (filterStatus === "disabled" && !task.isEnabled) ||
      (filterStatus === "completed" && task.status === "Completed") ||
      (filterStatus === "active" && task.status === "Active") ||
      (filterStatus === "failed" && task.status === "Failed")

    return matchesSearch && matchesStatus
  })

  // Sort tasks based on sort option
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  // 分页逻辑
  const totalPages = Math.ceil(sortedTasks.length / pageSize)
  const pagedTasks = sortedTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Get task logs for a task
  const getTaskLogs = (taskId: string) => {
    return sampleTaskLogs.filter((log) => log.taskId === taskId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{t('taskAutomation.title')}</h2>
        <Button onClick={() => setShowCreateForm(true)} className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('taskAutomation.createTask')}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t('taskAutomation.searchPlaceholder')}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t('taskAutomation.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('taskAutomation.allStatus')}</SelectItem>
              <SelectItem value="enabled">{t('taskAutomation.enabled')}</SelectItem>
              <SelectItem value="disabled">{t('taskAutomation.disabled')}</SelectItem>
              <SelectItem value="active">{t('taskAutomation.active')}</SelectItem>
              <SelectItem value="completed">{t('taskAutomation.completed')}</SelectItem>
              <SelectItem value="failed">{t('taskAutomation.failed')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <SortDesc className="h-4 w-4 text-gray-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('taskAutomation.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">{t('taskAutomation.recentFirst')}</SelectItem>
              <SelectItem value="name">{t('taskAutomation.nameAZ')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TaskList
        tasks={pagedTasks}
        onViewDetails={handleViewDetails}
        onViewLogs={handleViewLogs}
        onToggleStatus={handleToggleTaskStatus}
        onExecute={handleExecuteTask}
        onRemove={handleRemoveTask}
      />

      {sortedTasks.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg bg-white">
          <p className="text-gray-500">{t('taskAutomation.noTasksFound')}</p>
        </div>
      )}

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            {t('taskAutomation.prev')}
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            {t('taskAutomation.next')}
          </Button>
        </div>
      )}

      {showCreateForm && <CreateTaskForm onSubmit={handleCreateTask} onCancel={() => setShowCreateForm(false)} />}

      {showTaskDetails && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setShowTaskDetails(false)}
          onViewLogs={() => {
            setShowTaskDetails(false)
            setShowTaskLogs(true)
          }}
          onToggleStatus={() => handleToggleTaskStatus(selectedTask.id)}
          onExecute={() => handleExecuteTask(selectedTask.id)}
          onRemove={() => {
            handleRemoveTask(selectedTask.id)
            setShowTaskDetails(false)
          }}
        />
      )}

      {showTaskLogs && selectedTask && (
        <TaskLogs task={selectedTask} logs={getTaskLogs(selectedTask.id)} onClose={() => setShowTaskLogs(false)} />
      )}
    </div>
  )
}
