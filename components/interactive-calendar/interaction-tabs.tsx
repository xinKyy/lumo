"use client"

import { useState } from "react"
import {
  Bell,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  AlarmClockIcon as Snooze,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface InteractionTabsProps {
  onCreateTask: () => void
}

export default function InteractionTabs({ onCreateTask }: InteractionTabsProps) {
  const { t, i18n } = useTranslation()
  const [taskTab, setTaskTab] = useState("pending")

  // Sample data based on current language
  const yesterdayInteractions = i18n.language === 'ja' ? [
    {
      id: "1",
      fanName: "JennyLove",
      avatar: "https://i.pravatar.cc/150?u=jennylove",
      platform: "Instagram",
      action: "コメント",
      content: "新しいコンテンツが大好き！頑張ってください！",
      timestamp: "2024-03-20T14:30:00Z"
    },
    {
      id: "2",
      fanName: "SakuraChan",
      avatar: "https://i.pravatar.cc/150?u=sakurachan",
      platform: "TikTok",
      action: "投げ銭",
      content: "$20.00",
      timestamp: "2024-03-20T15:45:00Z"
    },
  ] : [
    {
      id: "1",
      fanName: "JennyLove",
      avatar: "https://i.pravatar.cc/150?u=jennylove",
      platform: "Instagram",
      action: "Commented",
      content: "Love your new content! Keep it up!",
      timestamp: "2024-03-20T14:30:00Z"
    },
    {
      id: "2",
      fanName: "SakuraChan",
      avatar: "https://i.pravatar.cc/150?u=sakurachan",
      platform: "TikTok",
      action: "Donated",
      content: "$20.00",
      timestamp: "2024-03-20T15:45:00Z"
    },
  ]

  const todayTasks = i18n.language === 'ja' ? [
    {
      id: "1",
      name: "誕生日のお祝いを送信",
      time: "10:00 AM",
      status: "Pending",
      targetCount: 3,
    },
    {
      id: "2",
      name: "お知らせ投稿",
      time: "2:00 PM",
      status: "In Progress",
      targetCount: 5,
    },
    {
      id: "3",
      name: "サポーターへの感謝",
      time: "5:00 PM",
      status: "Completed",
      targetCount: 2,
    },
    {
      id: "4",
      name: "週刊ニュースレター",
      time: "9:00 AM",
      status: "Failed",
      targetCount: 10,
    },
  ] : [
    {
      id: "1",
      name: "Send Birthday Wishes",
      time: "10:00 AM",
      status: "Pending",
      targetCount: 3,
    },
    {
      id: "2",
      name: "Post Announcement",
      time: "2:00 PM",
      status: "In Progress",
      targetCount: 5,
    },
    {
      id: "3",
      name: "Thank Supporters",
      time: "5:00 PM",
      status: "Completed",
      targetCount: 2,
    },
    {
      id: "4",
      name: "Weekly Newsletter",
      time: "9:00 AM",
      status: "Failed",
      targetCount: 10,
    },
  ]

  const alerts = i18n.language === 'ja' ? [
    {
      id: "1",
      fanName: "MikeRunner",
      avatar: "https://i.pravatar.cc/150?u=mikerunner",
      platform: "YouTube",
      alertType: "Inactive",
      details: "30日間インタラクションなし",
    },
    {
      id: "2",
      fanName: "TomCruise",
      avatar: "https://i.pravatar.cc/150?u=tomcruise",
      platform: "Instagram",
      alertType: "Unfollowed",
      details: "昨日フォロー解除",
    },
  ] : [
    {
      id: "1",
      fanName: "MikeRunner",
      avatar: "https://i.pravatar.cc/150?u=mikerunner",
      platform: "YouTube",
      alertType: "Inactive",
      details: "No interaction for 30 days",
    },
    {
      id: "2",
      fanName: "TomCruise",
      avatar: "https://i.pravatar.cc/150?u=tomcruise",
      platform: "Instagram",
      alertType: "Unfollowed",
      details: "Unfollowed yesterday",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-[#FFB300]" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-[#7A3CEF]" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-[#32C48D]" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-[#FF4D4F]" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case "Inactive":
        return <Clock className="h-4 w-4 text-[#FFB300]" />
      case "Unfollowed":
        return <AlertCircle className="h-4 w-4 text-[#FF4D4F]" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const filteredTasks = todayTasks.filter((task) => {
    if (taskTab === "pending") return task.status === "Pending"
    if (taskTab === "in-progress") return task.status === "In Progress"
    if (taskTab === "completed") return task.status === "Completed"
    if (taskTab === "failed") return task.status === "Failed"
    return true
  })

  return (
    <Tabs defaultValue="latest">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="latest">{t('latest')}</TabsTrigger>
        <TabsTrigger value="today">{t('today')}</TabsTrigger>
        <TabsTrigger value="alerts">{t('alerts')}</TabsTrigger>
      </TabsList>

      {/* Latest Interactions */}
      <TabsContent value="latest" className="mt-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-500">{t('latestInteractions')}</h3>
        <div className="max-h-[300px] space-y-3 overflow-y-auto">
          {yesterdayInteractions.map((interaction) => (
            <div key={interaction.id} className="rounded-md border border-gray-200 p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={interaction.avatar || "/placeholder.svg"} alt={interaction.fanName} />
                    <AvatarFallback className="bg-[#7A3CEF] text-white">
                      {interaction.fanName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{interaction.fanName}</span>
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="text-gray-500">{interaction.action}:</span> {interaction.content}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {new Date(interaction.timestamp).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Snooze className="mr-1 h-3 w-3" />
                  {t('snooze')}
                </Button>
                <Button size="sm" className="btn-primary" onClick={onCreateTask}>
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {t('thank')}
                </Button>
              </div>
            </div>
          ))}
          {yesterdayInteractions.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300">
              <p className="text-gray-500">{t('noRecentInteractions')}</p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Today's Tasks */}
      <TabsContent value="today" className="mt-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{t('todaysTasks')}</h3>
        <div className="w-full">
          <Tabs value={taskTab} onValueChange={setTaskTab} className="w-full">
            <TabsList className="flex w-full bg-transparent p-0 gap-0 border-b border-gray-200">
              <TabsTrigger value="pending" className="flex-1 text-xs py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#7A3CEF] data-[state=active]:text-[#7A3CEF] data-[state=active]:bg-white data-[state=active]:font-semibold transition-all">{t('pending')}</TabsTrigger>
              <TabsTrigger value="in-progress" className="flex-1 text-xs py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#7A3CEF] data-[state=active]:text-[#7A3CEF] data-[state=active]:bg-white data-[state=active]:font-semibold transition-all">{t('inProgress')}</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 text-xs py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#7A3CEF] data-[state=active]:text-[#7A3CEF] data-[state=active]:bg-white data-[state=active]:font-semibold transition-all">{t('completed')}</TabsTrigger>
              <TabsTrigger value="failed" className="flex-1 text-xs py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#7A3CEF] data-[state=active]:text-[#7A3CEF] data-[state=active]:bg-white data-[state=active]:font-semibold transition-all">{t('failed')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="max-h-[300px] space-y-3 overflow-y-auto">
          {filteredTasks.map((task) => (
            <div key={task.id} className="rounded-md border border-gray-200 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {task.time} • {task.targetCount} fans
                  </div>
                </div>
              </div>
              {(task.status === "Pending" || task.status === "Failed") && (
                <div className="mt-2 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Snooze className="mr-1 h-3 w-3" />
                    {t('snooze')}
                  </Button>
                  <Button size="sm" className="btn-primary" onClick={onCreateTask}>
                    <Send className="mr-1 h-3 w-3" />
                    {t('sendNow')}
                  </Button>
                </div>
              )}
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300">
              <p className="text-gray-500">{t(taskTab.replace('-', ' '))} {t('tasks')}</p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Alerts */}
      <TabsContent value="alerts" className="mt-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-500">{t('recentAlerts')}</h3>
        <div className="max-h-[300px] space-y-3 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-md border border-gray-200 p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={alert.avatar || "/placeholder.svg"} alt={alert.fanName} />
                    <AvatarFallback className="bg-[#7A3CEF] text-white">
                      {alert.fanName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{alert.fanName}</span>
                      <Badge
                        variant="outline"
                        className={`${
                          alert.alertType === "Inactive" ? "bg-[#FFF8E6] text-[#FFB300]" : "bg-[#FFF0F0] text-[#FF4D4F]"
                        }`}
                      >
                        {getAlertIcon(alert.alertType)}
                        <span className="ml-1">{alert.alertType}</span>
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {alert.details}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Snooze className="mr-1 h-3 w-3" />
                  {t('snooze')}
                </Button>
                <Button size="sm" className="btn-primary" onClick={onCreateTask}>
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {t('message')}
                </Button>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300">
              <p className="text-gray-500">{t('noAlerts')}</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
