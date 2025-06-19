"use client"

import { Copy, Calendar, ListChecks, Edit, Trash, Sparkles, FileText, Music, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Template } from "@/types/template"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TemplateDetailsProps {
  template: Template
  onClose: () => void
  onViewRelatedTasks: () => void
  onRemove: () => void
}

export default function TemplateDetails({ template, onClose, onViewRelatedTasks, onRemove }: TemplateDetailsProps) {
  const { t } = useTranslation()

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Copy template content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(template.content)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-3xl overflow-y-auto sm:max-w-3xl">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center space-x-3">
            <div>
              <div className="flex items-center space-x-2">
                <span>{template.name}</span>
                <Badge
                  variant="outline"
                  className={`${
                    template.type === "AI Generated" ? "bg-[#F5F5F5] text-[#7A3CEF]" : "bg-[#F5F5F5] text-[#F56DB6]"
                  }`}
                >
                  {template.type === "AI Generated" ? (
                    <Sparkles className="mr-1 h-3 w-3" />
                  ) : (
                    <FileText className="mr-1 h-3 w-3" />
                  )}
                  {template.type}
                </Badge>
              </div>
              <div className="text-sm text-gray-500">Created: {formatDate(template.createdAt)}</div>
            </div>
          </SheetTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#F56DB6] text-[#F56DB6] hover:bg-[#F56DB6] hover:text-white"
            >
              <Calendar className="mr-1 h-4 w-4" />
              {t('useTemplate')}
            </Button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="content" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">{t('content')}</TabsTrigger>
            <TabsTrigger value="details">{t('details')}</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable, index) => (
                  <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                    {`{{${variable}}}`}
                  </Badge>
                ))}
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <div className="whitespace-pre-wrap text-sm">{template.content}</div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="mr-1 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>

              {template.type === "Custom" && (template.audioFile || template.videoFile) && (
                <div className="space-y-4">
                  {template.audioFile && (
                    <div className="space-y-2">
                      <h3 className="flex items-center text-sm font-medium">
                        <Music className="mr-2 h-4 w-4" />
                        {t('audioFile')}
                      </h3>
                      <div className="rounded-md border border-gray-200 p-3">
                        <audio controls className="w-full">
                          <source src={template.audioFile} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  )}

                  {template.videoFile && (
                    <div className="space-y-2">
                      <h3 className="flex items-center text-sm font-medium">
                        <Video className="mr-2 h-4 w-4" />
                        {t('videoFile')}
                      </h3>
                      <div className="rounded-md border border-gray-200 p-3">
                        <video controls className="w-full">
                          <source src={template.videoFile} type="video/mp4" />
                          Your browser does not support the video element.
                        </video>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t('templateName')}</h3>
                  <p className="rounded-md bg-gray-50 p-2 text-sm">{template.name}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t('templateType')}</h3>
                  <p className="rounded-md bg-gray-50 p-2 text-sm">{template.type}</p>
                </div>
                {template.type === "AI Generated" && template.tone && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('toneStyle')}</h3>
                    <p className="rounded-md bg-gray-50 p-2 text-sm">{template.tone}</p>
                  </div>
                )}
                {template.type === "AI Generated" && template.keywords && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">{t('keywords')}</h3>
                    <p className="rounded-md bg-gray-50 p-2 text-sm">{template.keywords}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">{t('createdAt')}</h3>
                  <p className="rounded-md bg-gray-50 p-2 text-sm">{formatDate(template.createdAt)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('variables')}</h3>
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable, index) => (
                    <Badge key={index} variant="outline" className="bg-[#F5F5F5]">
                      {`{{${variable}}}`}
                    </Badge>
                  ))}
                  {template.variables.length === 0 && (
                    <p className="text-sm text-gray-500">{t('noVariables')}</p>
                  )}
                </div>
              </div>
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
            <Button variant="outline" onClick={onViewRelatedTasks}>
              <ListChecks className="mr-2 h-4 w-4" />
              {t('relatedTasks')}
            </Button>
            <Button variant="outline" onClick={onClose}>
              {t('close')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
