"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Copy, Sparkle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Template } from "@/types/template"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface CreateTemplateFormProps {
  onSubmit: (template: Template) => void
  onCancel: () => void
}

// Available variables for templates
const availableVariables = [
  "fan_name",
  "creator_name",
  "special_date",
  "content_title",
  "content_link",
  "donation_amount",
  "platform_name",
]

export default function CreateTemplateForm({ onSubmit, onCancel }: CreateTemplateFormProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("custom")

  // Custom template form state
  const [customTemplate, setCustomTemplate] = useState<Partial<Template>>({
    name: "",
    variables: [],
    type: "Custom",
    content: "",
    audioFile: "",
    videoFile: "",
    createdAt: new Date().toISOString(),
  })

  // AI template form state
  const [aiTemplate, setAiTemplate] = useState<Partial<Template>>({
    name: "",
    variables: [],
    type: "AI Generated",
    tone: "",
    content: "",
    keywords: "",
    createdAt: new Date().toISOString(),
  })

  // Variable selection state
  const [selectedVariable, setSelectedVariable] = useState("")

  // AI generation state
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCustomChange = (field: keyof Template, value: any) => {
    setCustomTemplate({
      ...customTemplate,
      [field]: value,
    })
  }

  const handleAIChange = (field: keyof Template, value: any) => {
    setAiTemplate({
      ...aiTemplate,
      [field]: value,
    })
  }

  const handleAddVariable = (template: "custom" | "ai") => {
    if (!selectedVariable) return

    if (template === "custom") {
      if (!customTemplate.variables?.includes(selectedVariable)) {
        setCustomTemplate({
          ...customTemplate,
          variables: [...(customTemplate.variables || []), selectedVariable],
        })
      }
    } else {
      if (!aiTemplate.variables?.includes(selectedVariable)) {
        setAiTemplate({
          ...aiTemplate,
          variables: [...(aiTemplate.variables || []), selectedVariable],
        })
      }
    }
    setSelectedVariable("")
  }

  const handleRemoveVariable = (template: "custom" | "ai", variable: string) => {
    if (template === "custom") {
      setCustomTemplate({
        ...customTemplate,
        variables: customTemplate.variables?.filter((v) => v !== variable) || [],
      })
    } else {
      setAiTemplate({
        ...aiTemplate,
        variables: aiTemplate.variables?.filter((v) => v !== variable) || [],
      })
    }
  }

  const handleGenerateContent = () => {
    if (!aiTemplate.name || !aiTemplate.keywords) return

    setIsGenerating(true)

    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = `Hey {{fan_name}}! I wanted to share some thoughts about ${aiTemplate.keywords}. As you know, I've been working on this for a while and I'm excited to share it with dedicated fans like you. Let me know what you think! - {{creator_name}}`

      setAiTemplate({
        ...aiTemplate,
        content: generatedContent,
      })

      setIsGenerating(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "custom") {
      if (!customTemplate.name || !customTemplate.content) return
      onSubmit(customTemplate as Template)
    } else {
      if (!aiTemplate.name || !aiTemplate.content) return
      onSubmit(aiTemplate as Template)
    }
  }

  const insertVariable = (template: "custom" | "ai", variable: string) => {
    const variableText = `{{${variable}}}`

    if (template === "custom") {
      const content = customTemplate.content || ""
      const textarea = document.getElementById("custom-content") as HTMLTextAreaElement

      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        const newContent = content.substring(0, start) + variableText + content.substring(end)

        handleCustomChange("content", newContent)

        // Set cursor position after the inserted variable
        setTimeout(() => {
          textarea.focus()
          textarea.setSelectionRange(start + variableText.length, start + variableText.length)
        }, 0)
      } else {
        handleCustomChange("content", content + variableText)
      }
    }
  }

  return (
    <Sheet open={true} onOpenChange={onCancel}>
      <SheetContent className="w-full max-w-4xl overflow-y-auto sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>{t('createTemplate')}</SheetTitle>
          <SheetDescription>{t('createTemplateDesc')}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <Tabs defaultValue="custom" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="custom">{t('customTemplate')}</TabsTrigger>
              <TabsTrigger value="ai">{t('aiGenerated')}</TabsTrigger>
            </TabsList>

            {/* Custom Template Tab */}
            <TabsContent value="custom" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-name">
                    {t('templateName')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Input
                    id="custom-name"
                    value={customTemplate.name || ""}
                    onChange={(e) => handleCustomChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t('variables')}</Label>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedVariable} onValueChange={setSelectedVariable}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={t('selectVariable')} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVariables.map((variable) => (
                          <SelectItem key={variable} value={variable}>
                            {variable}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={() => handleAddVariable("custom")} className="btn-primary">
                      {t('add')}
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {customTemplate.variables?.map((variable, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {`{{${variable}}}`}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveVariable("custom", variable)}
                        />
                      </Badge>
                    ))}
                    {(!customTemplate.variables || customTemplate.variables.length === 0) && (
                      <span className="text-sm text-gray-500">{t('noVariables')}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {t('clickToInsertVariable')}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {customTemplate.variables?.map((variable, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => insertVariable("custom", variable)}
                      >
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-content">
                    {t('content')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Textarea
                    id="custom-content"
                    value={customTemplate.content || ""}
                    onChange={(e) => handleCustomChange("content", e.target.value)}
                    placeholder={t('enterTemplateContent')}
                    rows={8}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="audio-file">{t('audioFile')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="audio-file"
                        type="text"
                        value={customTemplate.audioFile || ""}
                        onChange={(e) => handleCustomChange("audioFile", e.target.value)}
                        placeholder={t('audioFilePlaceholder')}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-file">{t('videoFile')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="video-file"
                        type="text"
                        value={customTemplate.videoFile || ""}
                        onChange={(e) => handleCustomChange("videoFile", e.target.value)}
                        placeholder={t('videoFilePlaceholder')}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-4">
                  <h3 className="mb-2 text-sm font-medium">{t('preview')}</h3>
                  <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">
                    {customTemplate.content || t('contentPreviewPlaceholder')}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button type="button" variant="outline" size="sm">
                      <Copy className="mr-1 h-4 w-4" />
                      {t('copy')}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AI Generated Tab */}
            <TabsContent value="ai" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-name">
                    {t('templateName')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Input
                    id="ai-name"
                    value={aiTemplate.name || ""}
                    onChange={(e) => handleAIChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">{t('toneStyle')}</Label>
                  <Select value={aiTemplate.tone || ""} onValueChange={(value) => handleAIChange("tone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectToneStyle')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Friendly">{t('friendly')}</SelectItem>
                      <SelectItem value="Playful">{t('playful')}</SelectItem>
                      <SelectItem value="Formal">{t('formal')}</SelectItem>
                      <SelectItem value="Humorous">{t('humorous')}</SelectItem>
                      <SelectItem value="Sincere">{t('sincere')}</SelectItem>
                      <SelectItem value="Rational">{t('rational')}</SelectItem>
                      <SelectItem value="Encouraging">{t('encouraging')}</SelectItem>
                      <SelectItem value="Affectionate">{t('affectionate')}</SelectItem>
                      <SelectItem value="Cool">{t('cool')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('variables')}</Label>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedVariable} onValueChange={setSelectedVariable}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={t('selectVariable')} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVariables.map((variable) => (
                          <SelectItem key={variable} value={variable}>
                            {variable}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={() => handleAddVariable("ai")} className="btn-primary">
                      {t('add')}
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {aiTemplate.variables?.map((variable, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {`{{${variable}}}`}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveVariable("ai", variable)} />
                      </Badge>
                    ))}
                    {(!aiTemplate.variables || aiTemplate.variables.length === 0) && (
                      <span className="text-sm text-gray-500">{t('noVariables')}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">
                    {t('keywords')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Textarea
                    id="keywords"
                    value={aiTemplate.keywords || ""}
                    onChange={(e) => handleAIChange("keywords", e.target.value)}
                    placeholder={t('enterKeywords')}
                    rows={3}
                    required
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleGenerateContent}
                  className="btn-primary w-full"
                  disabled={isGenerating || !aiTemplate.name || !aiTemplate.keywords}
                >
                  {isGenerating ? t('generating') : t('generateContent')}
                </Button>

                <div className="rounded-md border border-gray-200 p-4">
                  <h3 className="mb-2 text-sm font-medium">{t('preview')}</h3>
                  <div className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm">
                    {aiTemplate.content || t('contentPreviewPlaceholder')}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button type="button" variant="outline" size="sm">
                      <Copy className="mr-1 h-4 w-4" />
                      {t('copy')}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                {t('cancel')}
              </Button>
              <Button type="submit" className="btn-primary">
                {t('saveTemplate')}
              </Button>
            </div>
          </Tabs>
        </form>
      </SheetContent>
    </Sheet>
  )
}
