"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"
import type { Fan } from "@/types/fan"
import type { Template } from "@/types/template"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface CreateTaskFormProps {
  onSubmit: (task: Task) => void
  onCancel: () => void
  initialDate?: Date | null
  initialTemplate?: Template | null
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
    tags: [
      { label: "VIP", color: "#7A3CEF" },
      { label: "Active", color: "#32C48D" },
      { label: "Supporter", color: "#FFB300" }
    ],
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
    tags: [
      { label: "Content Creator", color: "#F56DB6" },
      { label: "Occasional", color: "#808080" }
    ],
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
    tags: [
      { label: "Super Fan", color: "#FF4D4F" },
      { label: "Donator", color: "#FFB300" },
      { label: "VIP", color: "#7A3CEF" }
    ],
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
    type: "AI Generated",
    content: "Happy birthday {{fan_name}}! 🎉 Thank you for being such an amazing supporter. Wishing you a fantastic day filled with joy and happiness! 🎂",
    variables: ["fan_name"],
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    name: "New Content Notification",
    type: "Manual",
    content: "Hey {{fan_name}}! I just released a new video '{{content_title}}'. Check it out here: {{content_link}}",
    variables: ["fan_name", "content_title", "content_link"],
    createdAt: "2023-05-10T14:45:00Z",
  },
  {
    id: "3",
    name: "Weekly Newsletter",
    type: "Manual",
    content: "Hi {{fan_name}},\n\nHere's your weekly update on what's new:\n\n{{newsletter_content}}\n\nStay tuned for more exciting content!\n\nBest regards",
    variables: ["fan_name", "newsletter_content"],
    createdAt: "2023-03-22T09:15:00Z",
  },
]

export default function CreateTaskForm({ onSubmit, onCancel, initialDate = null, initialTemplate = null }: CreateTaskFormProps) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(initialTemplate ? 3 : 1)
  const [taskData, setTaskData] = useState<Partial<Task>>({
    name: initialTemplate?.name ? `Task for ${initialTemplate.name}` : "",
    type: "Scheduled",
    triggerType: "Regular",
    isRecurring: false,
    channels: [],
    timezone: "UTC",
    notes: "",
    targetFans: [],
    templateId: initialTemplate?.id || "",
    createdAt: new Date().toISOString(),
    isEnabled: true,
    status: "Active",
    scheduledDate: initialDate ? initialDate.toISOString() : new Date().toISOString(),
  })

  const [selectedFans, setSelectedFans] = useState<string[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate?.id || "")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterPlatform, setFilterPlatform] = useState("all")

  // Set initial values based on initialDate and initialTemplate
  useEffect(() => {
    if (initialDate || initialTemplate) {
      const newTaskData = {
        ...taskData,
        type: "Scheduled",
        triggerType: "Regular",
        scheduledDate: initialDate ? initialDate.toISOString() : new Date().toISOString(),
      }

      if (initialTemplate) {
        newTaskData.name = `Task for ${initialTemplate.name}`
        newTaskData.templateId = initialTemplate.id
        setSelectedTemplate(initialTemplate.id)
      }

      setTaskData(newTaskData)
    }
  }, [initialDate, initialTemplate])

  const handleChange = (field: keyof Task, value: any) => {
    setTaskData({
      ...taskData,
      [field]: value,
    })
  }

  const handleTypeChange = (value: string) => {
    let triggerType = ""

    if (value === "Scheduled") {
      triggerType = "Regular"
    } else if (value === "Event") {
      triggerType = "New Post"
    } else {
      triggerType = "Manual"
    }

    setTaskData({
      ...taskData,
      type: value,
      triggerType,
    })
  }

  const handleTriggerTypeChange = (value: string) => {
    setTaskData({
      ...taskData,
      triggerType: value,
    })
  }

  const handleChannelToggle = (channel: string) => {
    const currentChannels = taskData.channels || []
    if (currentChannels.includes(channel)) {
      handleChange(
        "channels",
        currentChannels.filter((c) => c !== channel),
      )
    } else {
      handleChange("channels", [...currentChannels, channel])
    }
  }

  const handleSelectAllFans = () => {
    setSelectedFans(sampleFans.map((fan) => fan.id))
  }

  const handleClearFanSelection = () => {
    setSelectedFans([])
  }

  const handleFanToggle = (fanId: string) => {
    if (selectedFans.includes(fanId)) {
      setSelectedFans(selectedFans.filter((id) => id !== fanId))
    } else {
      setSelectedFans([...selectedFans, fanId])
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!taskData.name || !taskData.type || taskData.channels?.length === 0) {
        return
      }
    } else if (currentStep === 2) {
      // Validate step 2
      if (selectedFans.length === 0) {
        return
      }
      // Update task data with selected fans
      setTaskData({
        ...taskData,
        targetFans: selectedFans,
      })
    }

    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Update task data with selected template
    const finalTaskData = {
      ...taskData,
      targetFans: selectedFans,
      templateId: selectedTemplate,
    }

    onSubmit(finalTaskData as Task)
  }

  // Filter fans based on filters
  const filteredFans = sampleFans.filter((fan) => {
    const matchesPriority = filterPriority === "all" || fan.priority === filterPriority
    const matchesPlatform = filterPlatform === "all" || fan.platform === filterPlatform
    return matchesPriority && matchesPlatform
  })

  // Get selected template details
  const getSelectedTemplate = () => {
    return sampleTemplates.find((template) => template.id === selectedTemplate)
  }

  return (
    <Sheet open={true} onOpenChange={onCancel}>
      <SheetContent className="w-full max-w-4xl overflow-y-auto sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>{t('createTask')}</SheetTitle>
          <SheetDescription>{t('createTaskDesc')}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 1 ? "bg-[#7A3CEF] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className={currentStep >= 1 ? "font-medium" : "text-gray-500"}>{t('basicInfo')}</span>
            </div>
            <div className="h-0.5 w-12 bg-gray-200 md:w-24"></div>
            <div className="flex items-center space-x-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 2 ? "bg-[#7A3CEF] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className={currentStep >= 2 ? "font-medium" : "text-gray-500"}>{t('targetFans')}</span>
            </div>
            <div className="h-0.5 w-12 bg-gray-200 md:w-24"></div>
            <div className="flex items-center space-x-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep >= 3 ? "bg-[#7A3CEF] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className={currentStep >= 3 ? "font-medium" : "text-gray-500"}>{t('content')}</span>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-name">
                  {t('taskName')} <span className="text-[#FF4D4F]">*</span>
                </Label>
                <Input
                  id="task-name"
                  value={taskData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-type">
                  {t('taskType')} <span className="text-[#FF4D4F]">*</span>
                </Label>
                <Select value={taskData.type || ""} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectTaskType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">{t('manualTrigger')}</SelectItem>
                    <SelectItem value="Scheduled">{t('scheduled')}</SelectItem>
                    <SelectItem value="Event">{t('eventTriggered')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {taskData.type === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="trigger-type">{t('scheduleType')}</Label>
                  <Select value={taskData.triggerType || ""} onValueChange={handleTriggerTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectScheduleType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">{t('regularSchedule')}</SelectItem>
                      <SelectItem value="Birthday">{t('birthdaySchedule')}</SelectItem>
                      <SelectItem value="Holiday">{t('holidaySchedule')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {taskData.type === "Event" && (
                <div className="space-y-2">
                  <Label htmlFor="trigger-type">{t('eventType')}</Label>
                  <Select value={taskData.triggerType || ""} onValueChange={handleTriggerTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectEventType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New Post">{t('newPost')}</SelectItem>
                      <SelectItem value="Live Stream">{t('liveStreamAnnouncement')}</SelectItem>
                      <SelectItem value="Comment">{t('receivedComment')}</SelectItem>
                      <SelectItem value="Donation">{t('receivedDonation')}</SelectItem>
                      <SelectItem value="Milestone">{t('fanMilestone')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>
                  {t('recurring')} <span className="text-[#FF4D4F]">*</span>
                </Label>
                <RadioGroup
                  value={taskData.isRecurring ? "recurring" : "one-time"}
                  onValueChange={(value) => handleChange("isRecurring", value === "recurring")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time">{t('oneTime')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recurring" id="recurring" />
                    <Label htmlFor="recurring">{t('recurring')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>
                  {t('channels')} <span className="text-[#FF4D4F]">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-email"
                      checked={(taskData.channels || []).includes("Email")}
                      onCheckedChange={() => handleChannelToggle("Email")}
                    />
                    <Label htmlFor="channel-email">{t('email')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-line"
                      checked={(taskData.channels || []).includes("Line")}
                      onCheckedChange={() => handleChannelToggle("Line")}
                    />
                    <Label htmlFor="channel-line">{t('line')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-dm"
                      checked={(taskData.channels || []).includes("DM")}
                      onCheckedChange={() => handleChannelToggle("DM")}
                    />
                    <Label htmlFor="channel-dm">{t('dm')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-whatsapp"
                      checked={(taskData.channels || []).includes("WhatsApp")}
                      onCheckedChange={() => handleChannelToggle("WhatsApp")}
                    />
                    <Label htmlFor="channel-whatsapp">{t('whatsapp')}</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">
                  {t('timezone')} <span className="text-[#FF4D4F]">*</span>
                </Label>
                <Select value={taskData.timezone || ""} onValueChange={(value) => handleChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectTimezone')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">{t('utcUnified')}</SelectItem>
                    <SelectItem value="Personalized">{t('personalized')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t('notes')}</Label>
                <Textarea
                  id="notes"
                  value={taskData.notes || ""}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder={t('addNotes')}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Target Fans */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{t('selectTargetFans')}</h3>
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleSelectAllFans}>
                    {t('selectAll')}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={handleClearFanSelection}>
                    {t('clear')}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="filter-priority">{t('priority')}</Label>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder={t('priority')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all')}</SelectItem>
                      <SelectItem value="P0">P0</SelectItem>
                      <SelectItem value="P1">P1</SelectItem>
                      <SelectItem value="P2">P2</SelectItem>
                      <SelectItem value="P3">P3</SelectItem>
                      <SelectItem value="P4">P4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="filter-platform">{t('platform')}</Label>
                  <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder={t('platform')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all')}</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="X(Twitter)">X (Twitter)</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="OnlyFans">OnlyFans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto rounded-md border border-gray-200">
                {filteredFans.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredFans.map((fan) => (
                      <div key={fan.id} className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`fan-${fan.id}`}
                            checked={selectedFans.includes(fan.id)}
                            onCheckedChange={() => handleFanToggle(fan.id)}
                          />
                          <div className="flex items-center space-x-2">
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
                                {fan.platform} • {fan.handle}
                              </div>
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

              <div className="rounded-md bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('selectedFans')}</span>
                  <span className="text-[#7A3CEF]">{selectedFans.length}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Content */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">{t('selectTemplate')}</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectATemplate')} />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <div className="rounded-md border border-gray-200 p-4">
                  <h3 className="mb-2 text-sm font-medium">{t('preview')}</h3>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {getSelectedTemplate()?.variables.map((variable, index) => (
                      <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                  <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">
                    {getSelectedTemplate()?.content || t('selectTemplateToPreview')}
                  </div>
                </div>
              )}

              <div className="rounded-md bg-gray-50 p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('taskName')}:</span>
                    <span>{taskData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('taskType')}:</span>
                    <span>
                      {taskData.type} {taskData.triggerType ? `(${taskData.triggerType})` : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('recurring')}:</span>
                    <span>{taskData.isRecurring ? t('yes') : t('no')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('channels')}:</span>
                    <div className="flex flex-wrap gap-1">
                      {taskData.channels?.map((channel) => (
                        <Badge key={channel} variant="outline" className="bg-[#F5F5F5]">
                          {t(channel.toLowerCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('targetFans')}:</span>
                    <span>{selectedFans.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t('previous')}
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('cancel')}
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                className="btn-primary"
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!taskData.name || !taskData.type || taskData.channels?.length === 0)) ||
                  (currentStep === 2 && selectedFans.length === 0)
                }
              >
                {t('next')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="btn-primary" disabled={!selectedTemplate}>
                {t('createTask')}
              </Button>
            )}
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
