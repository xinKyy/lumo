"use client"

import { useState } from "react"
import { X, Edit, Upload, Plus, Trash2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Creator, CreatorPerformance } from "@/types/creator"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface CreatorDetailsProps {
  creator: Creator
  onClose: () => void
  onEdit: (creator: Creator) => void
  onRemove: (id: string) => void
  onUploadPerformance: (creator: Creator) => void
  onAddTask: (creator: Creator) => void
}

export default function CreatorDetails({
  creator,
  onClose,
  onEdit,
  onRemove,
  onUploadPerformance,
  onAddTask,
}: CreatorDetailsProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)

  // Mock performance data
  const performance: CreatorPerformance = {
    id: "1",
    creatorId: creator.id,
    totalRewards: 12500,
    liveStreams: [
      {
        id: "1",
        date: "2024-03-20",
        duration: 120,
        rewards: [
          { id: "1", amount: 500, timestamp: "2024-03-20T10:30:00Z", type: "ギフト" },
          { id: "2", amount: 300, timestamp: "2024-03-20T11:15:00Z", type: "投げ銭" },
        ]
      },
      {
        id: "2",
        date: "2024-03-18",
        duration: 90,
        rewards: [
          { id: "3", amount: 800, timestamp: "2024-03-18T14:20:00Z", type: "ギフト" },
        ]
      },
    ]
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Trial":
        return "bg-yellow-100 text-yellow-800"
      case "Blacklist":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  // 状态badge配色
  const statusColorMap: Record<string, string> = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-gray-100 text-gray-700',
    Trial: 'bg-yellow-100 text-yellow-700',
    Blacklist: 'bg-red-100 text-red-700',
  }
  // 标签配色
  const tagColorMap: Record<string, string> = {
    Idol: 'bg-purple-100 text-purple-700',
    Calm: 'bg-blue-100 text-blue-700',
    Friendly: 'bg-pink-100 text-pink-700',
    Talent: 'bg-green-100 text-green-700',
    Men: 'bg-gray-100 text-gray-700',
    Partner: 'bg-indigo-100 text-indigo-700',
    Inhouse: 'bg-orange-100 text-orange-700',
  }

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:max-w-md">
        <SheetHeader className="mb-6 pr-4">
          <SheetTitle asChild>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${creator.id}`} alt={creator.name} />
                  <AvatarFallback className="bg-[#7A3CEF] text-white text-xl">{creator.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg text-gray-900">{creator.name}</span>
                    <Badge className={statusColorMap[creator.status] || 'bg-gray-100 text-gray-700'}>{t(`creatorDatabase.${creator.status?.toLowerCase()}`) || creator.status}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#7A3CEF] text-[#7A3CEF] hover:bg-[#7A3CEF] hover:text-white" onClick={() => onEdit(creator)}>
                {t("creatorDatabase.edit")}
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        {/* 操作按钮区域 */}
        <div className="flex justify-between gap-2 mb-6">
          <Button variant="outline" size="sm" className="border-[#7A3CEF] text-[#7A3CEF] hover:bg-[#7A3CEF] hover:text-white" onClick={() => onUploadPerformance(creator)}>
            {t("creatorDatabase.uploadPerformance")}
          </Button>
          <Button variant="outline" size="sm" className="border-[#7A3CEF] text-[#7A3CEF] hover:bg-[#7A3CEF] hover:text-white" onClick={() => onAddTask(creator)}>
            {t("creatorDatabase.addTask")}
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 text-red-600 hover:bg-red-50" onClick={() => onRemove(creator.id)}>
            {t("creatorDatabase.remove")}
          </Button>
        </div>
        <Tabs defaultValue="information" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="information">{t("creatorDatabase.information")}</TabsTrigger>
            <TabsTrigger value="performance">{t("creatorDatabase.performance")}</TabsTrigger>
          </TabsList>
          {/* Information Tab */}
          <TabsContent value="information" className="mt-4 space-y-6">
            {/* Basic Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.basicInfo")}</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.name")}:</span>
                  <span>{creator.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.ggtkId")}:</span>
                  <span>{creator.ggtkId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.tiktokId")}:</span>
                  <span>{creator.tiktokId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.numberId")}:</span>
                  <span>{creator.numberId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.joinDate")}:</span>
                  <span>{creator.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.shorts")}:</span>
                  <span>{t(`creatorDatabase.${creator.shorts?.replace(/\s|&/g, '').replace(/\//g, '').toLowerCase()}`) || creator.shorts}</span>
                </div>
              </div>
            </div>
            {/* Demographics */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.demographics")}</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.gender")}:</span>
                  <span>{t(`creatorDatabase.${creator.gender?.toLowerCase()}`) || creator.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.age")}:</span>
                  <span>{creator.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.birthday")}:</span>
                  <span>{creator.birthday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.occupation")}:</span>
                  <span>{t(`creatorDatabase.${creator.occupation?.toLowerCase()}`) || creator.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.jobDescription")}:</span>
                  <span>{t(`creatorDatabase.${creator.jobDescription?.toLowerCase()}`) || creator.jobDescription}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.maritalStatus")}:</span>
                  <span>{t(`creatorDatabase.${creator.maritalStatus?.toLowerCase()}`) || creator.maritalStatus}</span>
                </div>
              </div>
            </div>
            {/* Personality */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.personality")}</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.type")}:</span>
                  <span>{t(`creatorDatabase.${creator.type?.toLowerCase()}`) || creator.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.streamingEnvironment")}:</span>
                  <span>{creator.streamingEnvironment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.communicationSkill")}:</span>
                  <span>{t(`creatorDatabase.${creator.communicationSkill === '高' ? 'high' : creator.communicationSkill === '普通' ? 'normal' : creator.communicationSkill === '低' ? 'low' : creator.communicationSkill}`) || creator.communicationSkill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.innerQualities")}:</span>
                  <span>{t(`creatorDatabase.${creator.innerQualities?.toLowerCase()}`) || creator.innerQualities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.cheerfulness")}:</span>
                  <span>{t(`creatorDatabase.${creator.cheerfulness?.replace(/\s/g, '').toLowerCase()}`) || creator.cheerfulness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.learningAbility")}:</span>
                  <span>{t(`creatorDatabase.${creator.learningAbility?.toLowerCase()}`) || creator.learningAbility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.productionSkills")}:</span>
                  <span>{t(`creatorDatabase.${creator.productionSkills?.toLowerCase()}`) || creator.productionSkills}</span>
                </div>
              </div>
            </div>
            {/* Agency Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.agencyInfo")}</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.inPart")}:</span>
                  <span>{t(`creatorDatabase.${creator.inPart?.toLowerCase()}`) || creator.inPart}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.group")}:</span>
                  <span>{creator.group}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.unit")}:</span>
                  <span>{creator.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.contactChannel")}:</span>
                  <span>{creator.contactChannel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.channelDetail")}:</span>
                  <span>{creator.channelDetail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.recruiter")}:</span>
                  <span>{creator.recruiter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.managerId")}:</span>
                  <span>{creator.managerId}</span>
                </div>
              </div>
            </div>
            {/* Dream Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.dreamInfo")}</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.dream")}:</span>
                  <span>{creator.dream}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("creatorDatabase.dreamDetail")}:</span>
                  <span>{creator.dreamDetail}</span>
                </div>
              </div>
            </div>
            {/* Status & Notes */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{t("creatorDatabase.status")}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <Badge className={statusColorMap[creator.status] || 'bg-gray-100 text-gray-700'}>{t(`creatorDatabase.${creator.status?.toLowerCase()}`) || creator.status}</Badge>
              </div>
              <div className="text-sm text-gray-700">
                <span className="text-gray-500">{t("creatorDatabase.notes")}:</span> {creator.notes || "-"}
              </div>
            </div>
          </TabsContent>
          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">合計報酬</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">0円</div>
              <p className="text-gray-500 text-sm mb-4">全ライブ配信からの合計報酬</p>
              <h4 className="font-semibold text-gray-900 mb-2">ライブ配信履歴</h4>
              <div className="w-full">
                <table className="w-full text-sm text-left border rounded overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 border-b whitespace-nowrap">日付</th>
                      <th className="px-2 py-1 border-b whitespace-nowrap">配信時間</th>
                      <th className="px-2 py-1 border-b whitespace-nowrap">報酬</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-1 border-b">2024-03-21</td>
                      <td className="px-2 py-1 border-b">120分</td>
                      <td className="px-2 py-1 border-b">100円</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 border-b">2024-03-18</td>
                      <td className="px-2 py-1 border-b">90分</td>
                      <td className="px-2 py-1 border-b">80円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
} 