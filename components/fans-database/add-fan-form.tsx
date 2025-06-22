"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Fan } from "@/types/fan"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface AddFanFormProps {
  onSubmit: (fan: Fan) => void
  onCancel: () => void
}

export default function AddFanForm({ onSubmit, onCancel }: AddFanFormProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Partial<Fan>>({
    nickname: "",
    avatar: "",
    platform: "",
    handle: "",
    priority: "P2",
    gender: "",
    birthday: "",
    country: "",
    language: "",
    email: "",
    line: "",
    twitter: "",
    whatsapp: "",
    instagram: "",
    tags: [],
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastInteractedAt: new Date().toISOString(),
    lastInteractionChannel: "",
    interactionCount7d: 0,
    lastCommentText: "",
    isDmSupported: true,
    isFollowing: true,
  })

  const [newTag, setNewTag] = useState("")

  const handleChange = (field: keyof Fan, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.some(tag => tag.label === newTag.trim())) {
      const newTagValue = {
        label: newTag.trim(),
        color: 'default'
      }
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTagValue],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t.label !== tag) || [],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nickname || !formData.priority) return

    onSubmit({
      id: "",
      nickname: formData.nickname || "",
      avatar: formData.avatar || "/placeholder.svg?height=100&width=100",
      platform: formData.platform || "",
      handle: formData.handle || "",
      priority: formData.priority || "P2",
      gender: formData.gender || "",
      birthday: formData.birthday || "",
      country: formData.country || "",
      language: formData.language || "",
      email: formData.email || "",
      line: formData.line || "",
      twitter: formData.twitter || "",
      whatsapp: formData.whatsapp || "",
      instagram: formData.instagram || "",
      tags: formData.tags || [],
      notes: formData.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastInteractedAt: new Date().toISOString(),
      lastInteractionChannel: formData.platform || "",
      interactionCount7d: 0,
      lastCommentText: "",
      isDmSupported: true,
      isFollowing: true,
    })
  }

  return (
    <Sheet open={true} onOpenChange={onCancel}>
      <SheetContent className="w-full max-w-3xl overflow-y-auto sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>{t('addFan.title')}</SheetTitle>
          <SheetDescription>{t('addFan.description')}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">{t('addFan.basicInformation')}</TabsTrigger>
              <TabsTrigger value="contact">{t('addFan.contactInformation')}</TabsTrigger>
              <TabsTrigger value="tags">{t('addFan.tagsAndNotes')}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nickname">
                    {t('addFan.nickname')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Input
                    id="nickname"
                    value={formData.nickname || ""}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">{t('addFan.avatarUrl')}</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar || ""}
                    onChange={(e) => handleChange("avatar", e.target.value)}
                    placeholder={t('addFan.avatarPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">{t('addFan.platform')}</Label>
                  <Select value={formData.platform || ""} onValueChange={(value) => handleChange("platform", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('addFan.selectPlatform')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">{t('Instagram')}</SelectItem>
                      <SelectItem value="X(Twitter)">{t('X (Twitter)')}</SelectItem>
                      <SelectItem value="YouTube">{t('YouTube')}</SelectItem>
                      <SelectItem value="TikTok">{t('TikTok')}</SelectItem>
                      <SelectItem value="OnlyFans">{t('OnlyFans')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="handle">{t('addFan.platformHandle')}</Label>
                  <Input
                    id="handle"
                    value={formData.handle || ""}
                    onChange={(e) => handleChange("handle", e.target.value)}
                    placeholder={t('addFan.handlePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">
                    {t('addFan.priority')} <span className="text-[#FF4D4F]">*</span>
                  </Label>
                  <Select
                    value={formData.priority || "P2"}
                    onValueChange={(value) => handleChange("priority", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('addFan.selectPriority')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P0">P0</SelectItem>
                      <SelectItem value="P1">P1</SelectItem>
                      <SelectItem value="P2">P2</SelectItem>
                      <SelectItem value="P3">P3</SelectItem>
                      <SelectItem value="P4">P4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">{t('addFan.gender')}</Label>
                  <Select value={formData.gender || ""} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('addFan.selectGender')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">{t('gender.male')}</SelectItem>
                      <SelectItem value="Female">{t('gender.female')}</SelectItem>
                      <SelectItem value="Other">{t('gender.other')}</SelectItem>
                      <SelectItem value="Prefer not to say">{t('gender.unknown')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">{t('addFan.birthday')}</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday || ""}
                    onChange={(e) => handleChange("birthday", e.target.value)}
                    placeholder={t('addFan.birthdayPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t('addFan.country')}</Label>
                  <Select value={formData.country || ""} onValueChange={(value) => handleChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('addFan.selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">{t('United States')}</SelectItem>
                      <SelectItem value="Japan">{t('Japan')}</SelectItem>
                      <SelectItem value="China">{t('China')}</SelectItem>
                      <SelectItem value="United Kingdom">{t('United Kingdom')}</SelectItem>
                      <SelectItem value="Canada">{t('Canada')}</SelectItem>
                      <SelectItem value="Australia">{t('Australia')}</SelectItem>
                      <SelectItem value="Germany">{t('Germany')}</SelectItem>
                      <SelectItem value="France">{t('France')}</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">{t('addFan.language')}</Label>
                  <Select value={formData.language || ""} onValueChange={(value) => handleChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('addFan.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">{t('English')}</SelectItem>
                      <SelectItem value="Japanese">{t('Japanese')}</SelectItem>
                      <SelectItem value="Chinese">{t('Chinese')}</SelectItem>
                      <SelectItem value="Spanish">{t('Spanish')}</SelectItem>
                      <SelectItem value="French">{t('French')}</SelectItem>
                      <SelectItem value="German">{t('German')}</SelectItem>
                      {/* Add more languages as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('addFan.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t('addFan.emailPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line">{t('addFan.line')}</Label>
                  <Input
                    id="line"
                    value={formData.line || ""}
                    onChange={(e) => handleChange("line", e.target.value)}
                    placeholder={t('addFan.linePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">{t('addFan.twitter')}</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter || ""}
                    onChange={(e) => handleChange("twitter", e.target.value)}
                    placeholder={t('addFan.twitterPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{t('addFan.whatsapp')}</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp || ""}
                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                    placeholder={t('addFan.whatsappPlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">{t('addFan.instagram')}</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram || ""}
                    onChange={(e) => handleChange("instagram", e.target.value)}
                    placeholder={t('addFan.instagramPlaceholder')}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tags" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('addFan.tags')}</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder={t('addFan.tagPlaceholder')}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} className="btn-primary">
                      {t('addFan.addTag')}
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag.label}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag.label)} />
                      </Badge>
                    ))}
                    {formData.tags?.length === 0 && <span className="text-sm text-gray-500">{t('addFan.noTagsAdded')}</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">{t('addFan.notes')}</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes || ""}
                    onChange={(e) => handleChange("notes", e.target.value)}
                    placeholder={t('addFan.addNotesPlaceholder')}
                    rows={5}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t('Cancel')}
            </Button>
            <Button type="submit" className="btn-primary">
              {t('addFan.save')}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
