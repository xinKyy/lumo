"use client"

import { MoreHorizontal, MessageSquare, CalendarPlus, Eye, Edit, Tag, Clock, Trash, X, Plus, User, HelpCircle, Instagram, Youtube, Twitter, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Fan } from "@/types/fan"
import React from "react"
import CreateTaskForm from "@/components/task-automation/create-task-form"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface FanCardProps {
  fan: Fan
  onViewDetails: () => void
  onViewInteractionLog: () => void
  onRemove: () => void
  onAddTag: () => void
}

// 性别icon和颜色映射
const genderMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Male:   { icon: <User className="h-4 w-4" />, color: "bg-blue-500" },
  Female: { icon: <User className="h-4 w-4" />, color: "bg-pink-400" },
  Other:  { icon: <User className="h-4 w-4" />, color: "bg-purple-400" },
  "Prefer not to say": { icon: <HelpCircle className="h-4 w-4" />, color: "bg-gray-400" },
}

// tag颜色映射
const tagColorMap: Record<string, string> = {
  VIP: "bg-purple-100 text-purple-700",
  Donator: "bg-orange-100 text-orange-700",
  "Super Fan": "bg-blue-100 text-blue-700",
  "Content Creator": "bg-green-100 text-green-700",
  Occasional: "bg-gray-100 text-gray-700",
  Active: "bg-pink-100 text-pink-700",
  Supporter: "bg-yellow-100 text-yellow-700",
}

// 平台icon映射
const platformIconMap: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="h-4 w-4 text-pink-500" />,
  X: <Twitter className="h-4 w-4 text-black" />,
  WhatsApp: <Mail className="h-4 w-4 text-green-600" />,
}

export default function FanCard({ fan, onViewDetails, onViewInteractionLog, onRemove, onAddTag }: FanCardProps) {
  const [showCreateTask, setShowCreateTask] = React.useState(false)
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
    return date.toLocaleDateString()
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P0":
        return "bg-[#FF4D4F] text-white"
      case "P1":
        return "bg-[#FFB300] text-white"
      case "P2":
        return "bg-[#A47EEF] text-white"
      case "P3":
        return "bg-[#32C48D] text-white"
      case "P4":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://i.pravatar.cc/100?u=${fan.id}`} alt={fan.nickname} />
            <AvatarFallback className="bg-[#A47EEF] text-white">{getInitials(fan.nickname)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-800">{fan.nickname}</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              {fan.handle && (
                <>
                  <span>{fan.handle}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Badge className={`${getPriorityColor(fan.priority)}`}>{fan.priority}</Badge>
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
              <DropdownMenuItem>
                <Tag className="mr-2 h-4 w-4" />
                {t('addTag')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onViewInteractionLog}>
                <Clock className="mr-2 h-4 w-4" />
                {t('interactionLog')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-[#FF4D4F]">
                <Trash className="mr-2 h-4 w-4" />
                {t('remove')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {fan.gender || fan.birthday ? (
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            {fan.gender && (
              <span className="flex items-center gap-1">
                <span className={`inline-flex items-center justify-center rounded-full ${genderMap[fan.gender]?.color} w-5 h-5`}>
                  {genderMap[fan.gender]?.icon}
                </span>
                {t(
                  fan.gender === 'Male' ? 'gender.male' :
                  fan.gender === 'Female' ? 'gender.female' :
                  fan.gender === 'Other' ? 'gender.other' :
                  fan.gender === 'Prefer not to say' ? 'gender.unknown' :
                  'gender.unknown')}
              </span>
            )}
            {fan.birthday && (
              <>
                {fan.gender && <span>•</span>}
                <span>{t('birthday')}: {formatDate(fan.birthday)}</span>
              </>
            )}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2 items-center">
          {fan.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
              style={{ background: tag.color, color: '#222' }}
            >
              {tag.label}
              <X className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => {/* 删除tag逻辑 */}} />
            </span>
          ))}
          <Button size="icon" variant="ghost" className="h-6 w-6 p-0 ml-1" onClick={onAddTag}>
            <Plus className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600 items-center">
          {fan.instagram && (
            <span className="flex items-center gap-1">
              {platformIconMap.Instagram}
              <span>{t('instagram')}</span>
            </span>
          )}
          {fan.twitter && (
            <span className="flex items-center gap-1">
              {platformIconMap.X}
              <span>{t('x')}</span>
            </span>
          )}
          {fan.whatsapp && (
            <span className="flex items-center gap-1">
              {platformIconMap.WhatsApp}
              <span>{t('whatsApp')}</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{t('lastInteraction')}: {formatDate(fan.lastInteractedAt)}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onViewDetails}>
          <Eye className="mr-1 h-4 w-4" />
          {t('view')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
          onClick={() => setShowCreateTask(true)}
        >
          <CalendarPlus className="mr-1 h-4 w-4" />
          {t('task')}
        </Button>
      </div>

      {showCreateTask && (
        <CreateTaskForm
          onSubmit={(task) => {
            console.log('Task created:', task)
            setShowCreateTask(false)
          }}
          onCancel={() => setShowCreateTask(false)}
        />
      )}
    </div>
  )
}
