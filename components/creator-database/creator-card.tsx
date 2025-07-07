"use client"

import { MoreHorizontal, Eye, BarChart3, Plus, Edit, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Creator } from "@/types/creator"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { SiTiktok } from "react-icons/si"

interface CreatorCardProps {
  creator: Creator
  onViewDetails: () => void
  onEdit: () => void
  onRemove: () => void
  onUploadPerformance: () => void
  onAddTask: () => void
  getStatusColor: (status: string) => string
}

export default function CreatorCard({
  creator,
  onViewDetails,
  onEdit,
  onRemove,
  onUploadPerformance,
  onAddTask,
  getStatusColor,
}: CreatorCardProps) {
  const { t } = useTranslation()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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

  return (
    <div className="rounded-xl shadow-sm bg-white hover:shadow-md transition p-4 border border-gray-100">
      {/* Header: Avatar + Name + Status + Actions */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://i.pravatar.cc/100?u=${creator.id}`} alt={creator.name} />
            <AvatarFallback className="bg-[#7A3CEF] text-white">
              {getInitials(creator.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{creator.name}</h3>
            <p className="text-sm text-gray-500 truncate">{creator.ggtkId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Badge className={statusColorMap[creator.status] || 'bg-gray-100 text-gray-700'}>
            {creator.status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                {t("creatorDatabase.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUploadPerformance}>
                <Upload className="mr-2 h-4 w-4" />
                {t("creatorDatabase.uploadPerformance")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                {t("creatorDatabase.remove")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-3">
        {/* Basic Info Row */}
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          {creator.gender && (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-100 w-5 h-5">
                <span className="text-xs font-medium text-blue-700 whitespace-nowrap">{t(`creatorDatabase.${creator.gender.toLowerCase()}`)}</span>
              </span>
            </span>
          )}
          {creator.age && (
            <>
              {creator.gender && <span>•</span>}
              <span>{t("creatorDatabase.age")}: {creator.age}</span>
            </>
          )}
          {creator.type && (
            <>
              {(creator.gender || creator.age) && <span>•</span>}
              <span>{t("creatorDatabase.type")}: {t(`creatorDatabase.${creator.type.toLowerCase()}`)}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center">
          {creator.type && (
            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${tagColorMap[creator.type] || 'bg-gray-100 text-gray-700'}`}>
              {t(`creatorDatabase.${creator.type.toLowerCase()}`)}
            </span>
          )}
          {creator.inPart && (
            <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${tagColorMap[creator.inPart] || 'bg-gray-100 text-gray-700'}`}>
              {t(`creatorDatabase.${creator.inPart.toLowerCase()}`)}
            </span>
          )}
        </div>

        {/* Platform Info */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 items-center">
          {creator.tiktokId && (
            <span className="flex items-center gap-1">
              <SiTiktok className="w-4 h-4 text-black" />
              <span>{creator.tiktokId}</span>
            </span>
          )}
          {creator.managerId && (
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-gray-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </span>
              <span>{t("creatorDatabase.manager")}: {creator.managerId}</span>
            </span>
          )}
        </div>

        {/* Join Date */}
        <div className="text-xs text-gray-400">
          {t("creatorDatabase.joined")} {new Date(creator.joinDate).toLocaleDateString()}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="flex-1 rounded-lg border-gray-200 hover:border-[#7A3CEF] text-xs"
          >
            <Eye className="mr-1 h-3 w-3" />
            {t("creatorDatabase.details")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddTask}
            className="flex-1 rounded-lg border-[#7A3CEF] text-[#7A3CEF] hover:bg-[#7A3CEF] hover:text-white text-xs"
          >
            <Plus className="mr-1 h-3 w-3" />
            {t("creatorDatabase.task")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadPerformance}
            className="flex-1 rounded-lg border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white text-xs"
          >
            <BarChart3 className="mr-1 h-3 w-3" />
            {t("creatorDatabase.performance")}
          </Button>
        </div>
      </div>
    </div>
  )
} 