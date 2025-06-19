"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { Fan } from "@/types/fan"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface InteractionLogProps {
  fan: Fan
  onClose: () => void
}

// Sample interaction log data
const interactionLogs = [
  {
    id: "1",
    timestamp: "2023-05-19T13:25:00Z",
    channel: "TikTok",
    type: "Comment",
    content: "いつも応援しています！次の配信が楽しみです！",
    isAutomated: false,
  },
  {
    id: "2",
    timestamp: "2023-05-17T10:15:00Z",
    channel: "TikTok",
    type: "Like",
    content: "Liked your video",
    isAutomated: false,
  },
  {
    id: "3",
    timestamp: "2023-05-15T09:30:00Z",
    channel: "Instagram",
    type: "DM",
    content: "Thank you for the birthday wishes!",
    isAutomated: false,
  },
  {
    id: "4",
    timestamp: "2023-05-15T08:00:00Z",
    channel: "Instagram",
    type: "Automated Message",
    content: "Happy birthday! 🎂 Hope you have a wonderful day!",
    isAutomated: true,
  },
  {
    id: "5",
    timestamp: "2023-05-10T14:20:00Z",
    channel: "TikTok",
    type: "Comment",
    content: "素晴らしい動画でした！",
    isAutomated: false,
  },
]

export default function InteractionLog({ fan, onClose }: InteractionLogProps) {
  const { t } = useTranslation()
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-3xl overflow-y-auto sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={fan.avatar || "/placeholder.svg"} alt={fan.nickname} />
              <AvatarFallback className="bg-[#7A3CEF] text-white">{getInitials(fan.nickname)}</AvatarFallback>
            </Avatar>
            <span>{t('interactionLog.title')}: {fan.nickname}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            {interactionLogs.map((log) => (
              <div
                key={log.id}
                className={`rounded-lg border p-4 ${
                  log.isAutomated ? "border-[#F5F5F5] bg-[#F5F5F5]" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{log.type}</span>
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs">{log.channel}</span>
                      {log.isAutomated && (
                        <span className="rounded-full bg-[#7A3CEF] px-2 py-0.5 text-xs text-white">{t('interactionLog.automated')}</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm">{log.content}</p>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(log.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">{t('interactionLog.loadMore')}</Button>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              {t('interactionLog.close')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
