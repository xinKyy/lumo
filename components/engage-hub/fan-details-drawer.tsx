"use client"

import {
  MessageSquare,
  CalendarPlus,
  Tag,
  Clock,
  Trash,
  X,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Fan, FanTag } from "@/types/fan"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"
import CreateTaskForm from "@/components/task-automation/create-task-form"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface FanDetailsDrawerProps {
  fan: Fan
  onClose: () => void
  onViewInteractionLog: () => void
  onRemove: () => void
}

export default function FanDetailsDrawer({ fan, onClose, onViewInteractionLog, onRemove }: FanDetailsDrawerProps) {
  const { t, i18n } = useTranslation()
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [tags, setTags] = useState<FanTag[]>(fan.tags)

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

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P0":
        return "bg-red-100 text-red-700"
      case "P1":
        return "bg-orange-100 text-orange-700"
      case "P2":
        return "bg-yellow-100 text-yellow-700"
      case "P3":
        return "bg-green-100 text-green-700"
      case "P4":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // Mock interaction data for the chart
  const interactionData = [
    { day: "Mon", count: 4 },
    { day: "Tue", count: 3 },
    { day: "Wed", count: 5 },
    { day: "Thu", count: 2 },
    { day: "Fri", count: 6 },
    { day: "Sat", count: 4 },
    { day: "Sun", count: 3 },
  ]

  const handleAddTag = (tag: FanTag) => {
    setTags([...tags, tag])
  }

  const handleDeleteTag = (label: string) => {
    setTags(tags.filter(tag => tag.label !== label))
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md overflow-y-auto sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between mb-6 pr-4">
          <SheetTitle className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={fan.avatar} alt={fan.nickname} />
              <AvatarFallback className="bg-[#A47EEF] text-white">{getInitials(fan.nickname)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span>{fan.nickname}</span>
                <Badge className={`${getPriorityColor(fan.priority)}`}>{fan.priority}</Badge>
              </div>
              <div className="text-sm text-gray-500">
                {fan.platform} {fan.handle}
              </div>
            </div>
          </SheetTitle>
          <div className="flex space-x-2 ml-auto min-w-[90px]">
            <Button
              variant="outline"
              size="sm"
              className="border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
              onClick={() => setShowCreateTask(true)}
            >
              <CalendarPlus className="mr-1 h-4 w-4" />
              Task
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="info" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">{t('basicInfo')}</TabsTrigger>
            <TabsTrigger value="interactions">{t('interactions')}</TabsTrigger>
            <TabsTrigger value="notes">{t('notesTags')}</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('basicInformation')}</h3>
              <div className="space-y-2">
                {fan.gender && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('gender')}</span>
                    <span>{t(`gender.${fan.gender}`)}</span>
                  </div>
                )}
                {fan.birthday && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('birthday')}</span>
                    <span>{formatDate(fan.birthday)}</span>
                  </div>
                )}
                {fan.country && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('countryRegion')}</span>
                    <span>{fan.country}</span>
                  </div>
                )}
                {fan.language && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t('language')}</span>
                    <span>{fan.language}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('createdAt')}</span>
                  <span>{formatDate(fan.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('updatedAt')}</span>
                  <span>{formatDate(fan.updatedAt)}</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6">{t('contactInformation')}</h3>
            <div className="space-y-3">
              {fan.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{fan.email}</span>
                </div>
              )}
              {fan.line && (
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  <span>Line: {fan.line}</span>
                </div>
              )}
              {fan.twitter && (
                <div className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4 text-gray-500" />
                  <span>{fan.twitter}</span>
                </div>
              )}
              {fan.whatsapp && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>WhatsApp: {fan.whatsapp}</span>
                </div>
              )}
              {fan.instagram && (
                <div className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4 text-gray-500" />
                  <span>{fan.instagram}</span>
                </div>
              )}
              {!fan.email && !fan.line && !fan.twitter && !fan.whatsapp && !fan.instagram && (
                <span className="text-gray-500">No contact information available</span>
              )}
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="mt-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t('interactionData')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('lastInteraction')}</span>
                  <span>{formatDate(fan.lastInteractedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('lastChannel')}</span>
                  <span>{fan.lastInteractionChannel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('interaction7d')}</span>
                  <span>{fan.interactionCount7d}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('dmSupported')}</span>
                  <span>{fan.isDmSupported ? t('yes') : t('no')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('followingStatus')}</span>
                  <span>{fan.isFollowing ? t('following') : t('notFollowing')}</span>
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <div className="space-y-1">
                  <span className="text-gray-500">{t('lastComment')}</span>
                  <p className="rounded-md bg-gray-50 p-2 text-sm">{fan.lastCommentText || t('noRecentComments')}</p>
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <h4 className="font-medium">{t('interactionTrend7d')}</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={interactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#A47EEF" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={onViewInteractionLog}>
                  <Clock className="mr-2 h-4 w-4" />
                  {t('viewInteractionLog')}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                      style={{ background: tag.color, color: "#222" }}
                    >
                      {tag.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleDeleteTag(tag.label)} />
                    </Badge>
                  ))}
                  {tags.length === 0 && <span className="text-gray-500">No tags added</span>}
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowAddTagModal(true)}>
                    <Tag className="mr-1 h-4 w-4" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notes</h3>
                <div className="rounded-md border border-gray-200 p-3">
                  <p className="whitespace-pre-wrap text-sm">{fan.notes || "No notes added"}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="text-[#FF4D4F] hover:bg-[#FF4D4F] hover:text-white" onClick={onRemove}>
            <Trash className="mr-2 h-4 w-4" />
            Remove Fan
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
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
      </SheetContent>
    </Sheet>
  )
} 