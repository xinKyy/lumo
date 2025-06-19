"use client"

import { AlertTriangle, Users, TrendingUp, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface WeeklyFocusProps {
  onCreateTask?: () => void;
  onCreateTemplate?: () => void;
}

export default function WeeklyFocus({ onCreateTask, onCreateTemplate }: WeeklyFocusProps) {
  const { t, i18n } = useTranslation()

  // Sample data based on current language
  const inactiveFans = i18n.language === 'ja' ? [
    {
      id: "1",
      nickname: "JennyLove",
      avatar: "https://i.pravatar.cc/150?u=jennylove",
      platform: "Instagram",
      handle: "@jennylove",
      lastActive: "30日前",
    },
    {
      id: "2",
      nickname: "MikeRunner",
      avatar: "https://i.pravatar.cc/150?u=mikerunner",
      platform: "YouTube",
      handle: "@mikerunner",
      lastActive: "45日前",
    },
  ] : [
    {
      id: "1",
      nickname: "JennyLove",
      avatar: "https://i.pravatar.cc/150?u=jennylove",
      platform: "Instagram",
      handle: "@jennylove",
      lastActive: "30 days ago",
    },
    {
      id: "2",
      nickname: "MikeRunner",
      avatar: "https://i.pravatar.cc/150?u=mikerunner",
      platform: "YouTube",
      handle: "@mikerunner",
      lastActive: "45 days ago",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="rounded-md bg-[#F5F5F5] p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="mt-1 h-5 w-5 text-[#7A3CEF]" />
          <div>
            <h4 className="font-medium text-gray-800">{t('AI Recommendations')}</h4>
            <p className="mt-2 text-sm text-gray-600">
              {t('This week, focus on re-engaging inactive fans and promoting your upcoming live stream. Consider sending')}
              {t('personalized messages to your top supporters and creating exclusive content for your VIP fans.')}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-[#FF4D4F]" />
          <h4 className="font-medium text-gray-800">{t('Fans Requiring Attention')}</h4>
        </div>
        <div className="space-y-3">
          {inactiveFans.map((fan) => (
            <div key={fan.id} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={fan.avatar || "/placeholder.svg"} alt={fan.nickname} />
                  <AvatarFallback className="bg-[#7A3CEF] text-white">
                    {fan.nickname.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{fan.nickname}</div>
                  <div className="text-xs text-gray-500">
                    {fan.handle}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant="outline" className="mb-2 bg-[#FFF0F0] text-[#FF4D4F]">
                  {t('Inactive')} {fan.lastActive}
                </Badge>
                <Button size="sm" className="btn-primary" onClick={onCreateTask}>
                  {t('Send Message')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="mb-3 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-[#32C48D]" />
          <h4 className="font-medium text-gray-800">{t('Growth Opportunities')}</h4>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0FFF5]">
                <Users className="h-5 w-5 text-[#32C48D]" />
              </div>
              <div>
                <div className="font-medium">{t('Engage New Followers')}</div>
                <div className="text-sm text-gray-500">{i18n.language === 'ja' ? '今週5人の新しいフォロワー' : '5 new followers this week'}</div>
              </div>
            </div>
            <Button size="sm" className="btn-primary">
              {t('View Fans')}
            </Button>
          </div>
        </div>
        <div className="rounded-md border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F5FF]">
                <Sparkles className="h-5 w-5 text-[#7A3CEF]" />
              </div>
              <div>
                <div className="font-medium">{t('Content Opportunity')}</div>
                <div className="text-sm text-gray-500">{i18n.language === 'ja' ? 'ファンがチュートリアルコンテンツにより多くエンゲージしている' : 'Fans are engaging more with your tutorial content'}</div>
              </div>
            </div>
            <Button size="sm" className="btn-primary" onClick={onCreateTemplate}>
              {t('Create Content')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
