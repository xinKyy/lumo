"use client"

import { useState } from "react"
import { X, Upload, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import type { Creator } from "@/types/creator"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface BatchImportProps {
  onClose: () => void
  onImport: (creators: Creator[]) => void
}

export default function BatchImport({ onClose, onImport }: BatchImportProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const templateContent = `Name,GGTK ID,TikTok ID,Number ID,Join Date,Shorts,Gender,Age,Birthday,Occupation,Job Description,Marital Status,Type,Streaming Environment,Communication Skill,Inner Qualities,Cheerfulness,Learning Ability,Production Skills,In-Part,Group,Unit,Contact Channel,Channel Detail,Recruiter,Manager ID,Dream,Dream Detail,Status,Notes
Sarah Johnson,GGTK001,@sarah_j,001,2023-01-15,Fashion & Lifestyle,Female,25,1998-05-15,Content Creator,Full-time,Single,Idol,Professional Studio,高,Confident,High,Fast,Advanced,Partner,Fashion Group,Lifestyle Unit,Email,sarah@agency.com,John Smith,MGR001,Fashion Influencer,Become a top fashion influencer with 1M+ followers,Active,Very active creator with high engagement rates`

    // Create and download the file
    const blob = new Blob([templateContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'creator_import_template.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setIsImporting(true)
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock imported creators
      const importedCreators: Creator[] = [
        {
          id: Date.now().toString(),
          name: "New Creator 1",
          ggtkId: "GGTK004",
          tiktokId: "@new_creator1",
          numberId: "004",
          joinDate: "2024-03-21",
          shorts: "Gaming",
          gender: "Male",
          age: 24,
          birthday: "2000-01-01",
          occupation: "Gamer",
          jobDescription: "Full-time",
          maritalStatus: "Single",
          type: "Friendly",
          streamingEnvironment: "Home Setup",
          communicationSkill: "高",
          innerQualities: "Energetic",
          cheerfulness: "High",
          learningAbility: "Good",
          productionSkills: "Intermediate",
          inPart: "Partner",
          group: "Gaming Group",
          unit: "Streaming Unit",
          contactChannel: "Discord",
          channelDetail: "new_creator1#1234",
          recruiter: "Alex Brown",
          managerId: "MGR004",
          dream: "Professional Streamer",
          dreamDetail: "Build a successful streaming career",
          status: "Trial",
          notes: "New creator from batch import",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: (Date.now() + 1).toString(),
          name: "New Creator 2",
          ggtkId: "GGTK005",
          tiktokId: "@new_creator2",
          numberId: "005",
          joinDate: "2024-03-21",
          shorts: "Tech Reviews",
          gender: "Female",
          age: 26,
          birthday: "1998-06-15",
          occupation: "Tech Reviewer",
          jobDescription: "Part-time",
          maritalStatus: "Single",
          type: "Talent",
          streamingEnvironment: "Professional Studio",
          communicationSkill: "普通",
          innerQualities: "Analytical",
          cheerfulness: "Medium",
          learningAbility: "Excellent",
          productionSkills: "Advanced",
          inPart: "Inhouse",
          group: "Tech Group",
          unit: "Review Unit",
          contactChannel: "Email",
          channelDetail: "new_creator2@agency.com",
          recruiter: "Lisa Wang",
          managerId: "MGR005",
          dream: "Tech YouTuber",
          dreamDetail: "Create educational tech content",
          status: "Active",
          notes: "Experienced tech reviewer",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ]

      onImport(importedCreators)
      setIsOpen(false)
      onClose()
    } catch (error) {
      console.error('Import failed:', error)
      // Handle error
    } finally {
      setIsImporting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>{t("creatorDatabase.batchImport")}</DialogTitle>
        <div className="p-6">
          <div className="mb-4 border-b border-gray-100" />
          <div className="space-y-6">
            {/* Description */}
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("creatorDatabase.importCreators")}
              </h3>
              <p className="text-gray-600">
                {t("creatorDatabase.batchImportDesc")}
              </p>
            </div>
            {/* Download Template */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-2">{t("creatorDatabase.downloadTemplate")}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("creatorDatabase.downloadTemplateDesc")}
                  </p>
                  <Button variant="outline" onClick={handleDownloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("creatorDatabase.downloadTemplate")}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* File Upload */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-2">{t("creatorDatabase.uploadFile")}</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("creatorDatabase.acceptedFormats")}
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : t("creatorDatabase.selectFile")}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleClose}>
                {t("creatorDatabase.cancel")}
              </Button>
              <Button variant="default" onClick={handleImport} disabled={!selectedFile || isImporting}>
                {t("creatorDatabase.import")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 