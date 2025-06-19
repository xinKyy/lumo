"use client"

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

interface CreateTaskDrawerProps {
  fan: Fan
  onSubmit: (task: Task) => void
  onClose: () => void
  initialDate?: Date | null
  initialTemplate?: Template | null
}

// 示例模板数据
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

export default function CreateTaskDrawer({ fan, onSubmit, onClose, initialDate = null, initialTemplate = null }: CreateTaskDrawerProps) {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(initialTemplate ? 2 : 1)
  const [taskData, setTaskData] = useState<Partial<Task>>({
    name: initialTemplate?.name ? `Task for ${initialTemplate.name}` : "",
    type: "Scheduled",
    triggerType: "Regular",
    isRecurring: false,
    channels: [],
    timezone: "UTC",
    notes: "",
    targetFans: [fan.id],
    templateId: initialTemplate?.id || "",
    createdAt: new Date().toISOString(),
    isEnabled: true,
    status: "Active",
    scheduledDate: initialDate ? initialDate.toISOString() : new Date().toISOString(),
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate?.id || "")

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

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!taskData.name || !taskData.type || taskData.channels?.length === 0) {
        return
      }
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
      templateId: selectedTemplate,
    }

    onSubmit(finalTaskData as Task)
  }

  // Get selected template details
  const getSelectedTemplate = () => {
    return sampleTemplates.find((template) => template.id === selectedTemplate)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-4xl overflow-y-auto sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>{t('createTask')}</SheetTitle>
          <SheetDescription>{t('createTaskDesc', { name: fan.nickname })}</SheetDescription>
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
                <Label htmlFor="task-name">{t('taskName')} <span className="text-[#FF4D4F]">*</span></Label>
                <Input
                  id="task-name"
                  value={taskData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-type">{t('taskType')} <span className="text-[#FF4D4F]">*</span></Label>
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
                      <SelectItem value="Live Stream">{t('liveStream')}</SelectItem>
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
                      id="channel-twitter"
                      checked={(taskData.channels || []).includes("X (Twitter)")}
                      onCheckedChange={() => handleChannelToggle("X (Twitter)")}
                    />
                    <Label htmlFor="channel-twitter">{t('xTwitter')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-whatsapp"
                      checked={(taskData.channels || []).includes("WhatsApp")}
                      onCheckedChange={() => handleChannelToggle("WhatsApp")}
                    />
                    <Label htmlFor="channel-whatsapp">{t('whatsApp')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="channel-instagram"
                      checked={(taskData.channels || []).includes("Instagram")}
                      onCheckedChange={() => handleChannelToggle("Instagram")}
                    />
                    <Label htmlFor="channel-instagram">{t('instagram')}</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">{t('timezone')} <span className="text-[#FF4D4F]">*</span></Label>
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
              <div className="space-y-2">
                <Label htmlFor="target-fans">{t('targetFans')}</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="target-fan-1"
                      checked={(taskData.targetFans || []).includes("1")}
                      onCheckedChange={(value) => handleChange("targetFans", value ? [...(taskData.targetFans || []), "1"] : (taskData.targetFans || []).filter((f) => f !== "1"))}
                    />
                    <Label htmlFor="target-fan-1">Fan 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="target-fan-2"
                      checked={(taskData.targetFans || []).includes("2")}
                      onCheckedChange={(value) => handleChange("targetFans", value ? [...(taskData.targetFans || []), "2"] : (taskData.targetFans || []).filter((f) => f !== "2"))}
                    />
                    <Label htmlFor="target-fan-2">Fan 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="target-fan-3"
                      checked={(taskData.targetFans || []).includes("3")}
                      onCheckedChange={(value) => handleChange("targetFans", value ? [...(taskData.targetFans || []), "3"] : (taskData.targetFans || []).filter((f) => f !== "3"))}
                    />
                    <Label htmlFor="target-fan-3">Fan 3</Label>
                  </div>
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
                    {getSelectedTemplate()?.content || t('selectTemplatePreview')}
                  </div>
                </div>
              )}

              <div className="rounded-md bg-gray-50 p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Task Name:</span>
                    <span>{taskData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Task Type:</span>
                    <span>
                      {taskData.type} {taskData.triggerType ? `(${taskData.triggerType})` : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Recurring:</span>
                    <span>{taskData.isRecurring ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Channels:</span>
                    <div className="flex flex-wrap gap-1">
                      {taskData.channels?.map((channel) => (
                        <Badge key={channel} variant="outline" className="bg-[#F5F5F5]">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Target Fan:</span>
                    <span>{fan.nickname}</span>
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
              <Button type="button" variant="outline" onClick={onClose}>
                {t('cancel')}
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                className="btn-primary"
                onClick={handleNextStep}
                disabled={!taskData.name || !taskData.type || taskData.channels?.length === 0}
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