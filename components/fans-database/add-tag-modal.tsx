"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { FanTag } from "@/types/fan"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface AddTagModalProps {
  onClose: () => void
  onAdd: (tag: FanTag) => void
}

export default function AddTagModal({ onClose, onAdd }: AddTagModalProps) {
  const { t } = useTranslation()
  const [label, setLabel] = useState("")
  const [color, setColor] = useState("#A5B4FC")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (label.trim()) {
      onAdd({ label: label.trim(), color })
    }
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('addTagModal.title')}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">{t('addTagModal.tagLabel')}</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={t('addTagModal.enterTagLabel')}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">{t('addTagModal.tagColor')}</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20"
              />
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('addTagModal.cancel')}
            </Button>
            <Button type="submit">{t('addTagModal.addTag')}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
} 