"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface BatchImportProps {
  onClose: () => void
}

export default function BatchImport({ onClose }: BatchImportProps) {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      onClose()
    }, 2000)
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="max-w-md w-full">
        <SheetHeader>
          <SheetTitle>{t('batchImport.title')}</SheetTitle>
          <SheetDescription>{t('batchImport.description')}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              {t('batchImport.uploadDescription')}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="file">{t('batchImport.uploadFile')}</Label>
            <div className="flex items-center gap-2">
              <input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('file')?.click()}>
                {file ? t('batchImport.changeFile') : t('batchImport.selectFile')}
              </Button>
              <span className="text-sm text-gray-500">{file ? file.name : t('batchImport.noFileSelected')}</span>
            </div>
            <p className="text-xs text-gray-500">{t('batchImport.acceptedFormats')}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <div>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t('batchImport.downloadTemplate')}
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                {t('batchImport.cancel')}
              </Button>
              <Button className="btn-primary" onClick={handleImport} disabled={!file || isUploading}>
                {isUploading ? (
                  <>{t('batchImport.importing')}</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {t('batchImport.import')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
