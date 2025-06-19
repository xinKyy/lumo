"use client"

import { Clock, Play, Pause, Send, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Task } from "@/types/task"
import type { Fan } from "@/types/fan"
import type { Template } from "@/types/template"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TaskDetailsProps {
  task: Task
  onClose: () => void
  onViewLogs: () => void
  onToggleStatus: () => void
  onExecute: () => void
  onRemove: () => void
}

// Sample data for demonstration
const sampleFans: Fan[] = [
  {
    id: "1",
    nickname: "JennyLove",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    handle: "@jennylove",
    priority: "P1",
    gender: "Female",
    birthday: "1995-05-15",
    country: "United States",
    language: "English",
    email: "jenny@example.com",
    line: "jennyl",
    twitter: "@jennylove",
    whatsapp: "+1234567890",
    instagram: "@jennylove",
    tags: ["VIP", "Active", "Supporter"],
    notes: "Very active supporter, comments on every post",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    lastInteractedAt: "2023-05-18T09:15:00Z",
    lastInteractionChannel: "Instagram",
    interactionCount7d: 12,
    lastCommentText: "Love your new content! Keep it up!",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "2",
    nickname: "MikeRunner",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "YouTube",
    handle: "@mikerunner",
    priority: "P2",
    gender: "Male",
    birthday: "1990-08-22",
    country: "Canada",
    language: "English",
    email: "mike@example.com",
    line: "",
    twitter: "@mikerun",
    whatsapp: "",
    instagram: "@mikerunner",
    tags: ["Content Creator", "Occasional"],
    notes: "Fellow content creator, potential collaboration",
    createdAt: "2023-02-10T08:20:00Z",
    updatedAt: "2023-05-15T11:30:00Z",
    lastInteractedAt: "2023-05-10T16:45:00Z",
    lastInteractionChannel: "YouTube",
    interactionCount7d: 3,
    lastCommentText: "Great video! Would love to collab sometime.",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "3",
    nickname: "SakuraChan",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "TikTok",
    handle: "@sakurachan",
    priority: "P0",
    gender: "Female",
    birthday: "1998-12-03",
    country: "Japan",
    language: "Japanese",
    email: "",
    line: "sakura_chan",
    twitter: "@sakura_jp",
    whatsapp: "",
    instagram: "@sakura_chan_jp",
    tags: ["Super Fan", "Donator", "VIP"],
    notes: "Top supporter, always donates during live streams",
    createdAt: "2022-11-05T09:10:00Z",
    updatedAt: "2023-05-19T13:25:00Z",
    lastInteractedAt: "2023-05-19T13:25:00Z",
    lastInteractionChannel: "TikTok",
    interactionCount7d: 18,
    lastCommentText: "いつも応援しています！次の配信が楽しみです！",
    isDmSupported: true,
    isFollowing: true,
  },
]

// Sample templates for demonstration
const sampleTemplates: Template[] = [
  {
    id: "1",
    name: "Birthday Wishes",
    variables: ["fan_name", "creator_name", "special_date"],
    type: "Custom",
    content:
      "Happy birthday, {{fan_name}}! Thank you for your continued support. Wishing you all the best on your special day! - {{creator_name}}",
    createdAt: "2023-04-15T10:30:00Z",
    audioFile: "",
    videoFile: "",
  },
  {
    id: "2",
    name: "New Content Notification",
    variables: ["fan_name", "content_title", "content_link"],
    type: "AI Generated",
    tone: "Exciting",
    content:
      "Hey {{fan_name}}! I just released a new video '{{content_title}}'. Check it out here: {{content_link}} and let me know what you think!",
    createdAt: "2023-05-10T14:45:00Z",
    keywords: "new content, video release, exclusive",
  },
  {
    id: "3",
    name: "Thank You for Donation",
    variables: ["fan_name", "donation_amount", "creator_name"],
    type: "Custom",
    content:
      "Thank you so much, {{fan_name}}, for your generous donation of {{donation_amount}}! Your support means the world to me and helps me continue creating content you love. - {{creator_name}}",
    createdAt: "2023-03-22T09:15:00Z",
    audioFile: "/thank-you-message.mp3",
    videoFile: "",
  },
]

export default function TaskDetails({
  task,
  onClose,
  onViewLogs,
  onToggleStatus,
  onExecute,
  onRemove,
}: TaskDetailsProps) {
  const { t } = useTranslation()
  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
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

  // Get target fans
  const getTargetFans = () => {
    return sampleFans.filter((fan) => (task.targetFans || []).includes(fan.id))
  }

  // Get template
  const getTemplate = () => {
    return sampleTemplates.find((template) => template.id === task.templateId)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-lg overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>{t('taskDetails')}</SheetTitle>
          </VisuallyHidden>
          <div className="flex flex-1 items-center min-w-0">
            <span className="text-lg font-semibold truncate">{task.name}</span>
          </div>
        </SheetHeader>
        <div className="text-sm text-gray-500 mt-1">{t('created')}: {formatDate(task.createdAt)}</div>
        <div className="flex items-center gap-4 mt-2 mb-2">
          <Badge className={getStatusBadgeColor(task.status)}>{t(`status.${task.status}`)}</Badge>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleStatus}
              className={task.isEnabled ? "border-[#FF4D4F] text-[#FF4D4F]" : "border-[#32C48D] text-[#32C48D]"}
            >
              {task.isEnabled ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
              {task.isEnabled ? t('disable') : t('enable')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExecute}
              className="border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
              disabled={!task.isEnabled || task.status === "Completed"}
            >
              <Send className="mr-1 h-4 w-4" />
              {t('sendNow')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">{t('details')}</TabsTrigger>
            <TabsTrigger value="fans">{t('targetFans')}</TabsTrigger>
            <TabsTrigger value="content">{t('content')}</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('taskType')}</h3>
                <p className="rounded-md bg-gray-50 p-2 text-sm">
                  {t(`taskType.${task.type}`)} {task.triggerType ? `(${t(`triggerType.${task.triggerType}`)})` : ""}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('recurring')}</h3>
                <p className="rounded-md bg-gray-50 p-2 text-sm">{task.isRecurring ? t('yes') : t('no')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('timezone')}</h3>
                <p className="rounded-md bg-gray-50 p-2 text-sm">{task.timezone}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('created')}</h3>
                <p className="rounded-md bg-gray-50 p-2 text-sm">{formatDate(task.createdAt)}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('channels')}</h3>
                <div className="flex flex-wrap gap-2">
                  {(task.channels || []).map((channel, index) => (
                    <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                      {t(channel.toLowerCase())}
                    </Badge>
                  ))}
                </div>
              </div>

              {task.notes && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t('notes')}</h3>
                  <p className="rounded-md bg-gray-50 p-2 text-sm">{task.notes}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="fans" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{t('targetFans')} ({getTargetFans().length})</h3>
              </div>

              <div className="max-h-[300px] overflow-y-auto rounded-md border border-gray-200">
                {getTargetFans().length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {getTargetFans().map((fan) => (
                      <div key={fan.id} className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                            <img
                              src={fan.avatar || "/placeholder.svg"}
                              alt={fan.nickname}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{fan.nickname}</div>
                            <div className="text-xs text-gray-500">
                              {t(fan.platform.toLowerCase())} • {fan.handle}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            fan.priority === "P0"
                              ? "bg-[#FF4D4F] text-white"
                              : fan.priority === "P1"
                                ? "bg-[#FFB300] text-white"
                                : fan.priority === "P2"
                                  ? "bg-[#7A3CEF] text-white"
                                  : "bg-gray-400 text-white"
                          }`}
                        >
                          {fan.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-20 items-center justify-center">
                    <p className="text-gray-500">{t('noFansMatch')}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('selectTemplate')}</h3>
                <p className="rounded-md bg-gray-50 p-2 text-sm">{getTemplate()?.name || t('selectATemplate')}</p>
              </div>

              {getTemplate() && (
                <>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('variables')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {getTemplate()?.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('preview')}</h3>
                    <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">
                      {getTemplate()?.content}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" className="text-[#FF4D4F] hover:bg-[#FF4D4F] hover:text-white" onClick={onRemove}>
              <Trash className="mr-2 h-4 w-4" />
              {t('delete')}
            </Button>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              {t('edit')}
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onViewLogs}>
              <Clock className="mr-2 h-4 w-4" />
              {t('taskLogs')}
            </Button>
            <Button variant="outline" onClick={onClose}>
              {t('close', 'Close')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
