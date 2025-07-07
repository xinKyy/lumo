"use client"

import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { Creator } from "@/types/creator"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { t } from "i18next"

const creatorSchema = z.object({
  // Basic Info
  name: z.string().min(1, t("creatorDatabase.nameRequired")),
  ggtkId: z.string().min(1, t("creatorDatabase.ggtkIdRequired")), 
  tiktokId: z.string().min(1, t("creatorDatabase.tiktokIdRequired")),
  numberId: z.string().min(1, t("creatorDatabase.numberIdRequired")),
  joinDate: z.string().min(1, t("creatorDatabase.joinDateRequired")),
  shorts: z.string().optional(),
  
  // Demographics
  gender: z.string().optional(),
  age: z.number().optional(),
  birthday: z.string().optional(),
  occupation: z.string().optional(),
  jobDescription: z.string().optional(),
  maritalStatus: z.string().optional(),
  
  // Personality
  type: z.enum(["Idol", "Calm", "Friendly", "Talent", "Men"]).optional(),
  streamingEnvironment: z.string().optional(),
  communicationSkill: z.enum(["高", "普通", "低"]).optional(),
  innerQualities: z.string().optional(),
  cheerfulness: z.string().optional(),
  learningAbility: z.string().optional(),
  productionSkills: z.string().optional(),
  
  // Agency Info
  inPart: z.enum(["Partner", "Inhouse"]),
  group: z.string().min(1, t("creatorDatabase.groupRequired")),
  unit: z.string().min(1, t("creatorDatabase.unitRequired")),
  contactChannel: z.string().optional(),
  channelDetail: z.string().optional(),
  recruiter: z.string().optional(),
  managerId: z.string().optional(),
  
  // Dream Info
  dream: z.string().optional(),
  dreamDetail: z.string().optional(),
  
  // Status
  status: z.enum(["Active", "Inactive", "Trial", "Blacklist"]),
  
  // Notes
  notes: z.string().optional(),
})

type CreatorFormData = z.infer<typeof creatorSchema>

interface AddCreatorFormProps {
  onClose: () => void
  onSubmit: (creator: Creator) => void
}

export default function AddCreatorForm({ onClose, onSubmit }: AddCreatorFormProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)

  const creatorSchema = z.object({
    // Basic Info
    name: z.string().min(1, t("creatorDatabase.nameRequired")),
    ggtkId: z.string().min(1, t("creatorDatabase.ggtkIdRequired")),
    tiktokId: z.string().min(1, t("creatorDatabase.tiktokIdRequired")),
    numberId: z.string().min(1, t("creatorDatabase.numberIdRequired")),
    joinDate: z.string().min(1, t("creatorDatabase.joinDateRequired")),
    shorts: z.string().optional(),
    
    // Demographics
    gender: z.string().optional(),
    age: z.number().optional(),
    birthday: z.string().optional(),
    occupation: z.string().optional(),
    jobDescription: z.string().optional(),
    maritalStatus: z.string().optional(),
    
    // Personality
    type: z.enum(["Idol", "Calm", "Friendly", "Talent", "Men"]).optional(),
    streamingEnvironment: z.string().optional(),
    communicationSkill: z.enum(["高", "普通", "低"]).optional(),
    innerQualities: z.string().optional(),
    cheerfulness: z.string().optional(),
    learningAbility: z.string().optional(),
    productionSkills: z.string().optional(),
    
    // Agency Info
    inPart: z.enum(["Partner", "Inhouse"]),
    group: z.string().min(1, t("creatorDatabase.groupRequired")),
    unit: z.string().min(1, t("creatorDatabase.unitRequired")),
    contactChannel: z.string().optional(),
    channelDetail: z.string().optional(),
    recruiter: z.string().optional(),
    managerId: z.string().optional(),
    
    // Dream Info
    dream: z.string().optional(),
    dreamDetail: z.string().optional(),
    
    // Status
    status: z.enum(["Active", "Inactive", "Trial", "Blacklist"]),
    
    // Notes
    notes: z.string().optional(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreatorFormData>({
    resolver: zodResolver(creatorSchema),
    defaultValues: {
      status: "Active",
      inPart: "Partner",
    },
  })

  const handleFormSubmit = (data: CreatorFormData) => {
    const creator: Creator = {
      id: "",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    onSubmit(creator)
    setIsOpen(false)
    onClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("creatorDatabase.addCreator")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">{t("creatorDatabase.basicInfo")}</TabsTrigger>
              <TabsTrigger value="demographics">{t("creatorDatabase.demographics")}</TabsTrigger>
              <TabsTrigger value="personality">{t("creatorDatabase.personality")}</TabsTrigger>
              <TabsTrigger value="agency">{t("creatorDatabase.agencyInfo")}</TabsTrigger>
              <TabsTrigger value="dream">{t("creatorDatabase.dreamInfo")}</TabsTrigger>
              <TabsTrigger value="status">{t("creatorDatabase.status")}</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("creatorDatabase.name")} *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder={t("creatorDatabase.enterName")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ggtkId">{t("creatorDatabase.ggtkId")} *</Label>
                  <Input
                    id="ggtkId"
                    {...register("ggtkId")}
                    placeholder={t("creatorDatabase.enterGgtkId")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.ggtkId && (
                    <p className="text-xs text-red-500">{errors.ggtkId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktokId">{t("creatorDatabase.tiktokId")} *</Label>
                  <Input
                    id="tiktokId"
                    {...register("tiktokId")}
                    placeholder={t("creatorDatabase.enterTiktokId")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.tiktokId && (
                    <p className="text-xs text-red-500">{errors.tiktokId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberId">{t("creatorDatabase.numberId")} *</Label>
                  <Input
                    id="numberId"
                    {...register("numberId")}
                    placeholder={t("creatorDatabase.enterNumberId")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.numberId && (
                    <p className="text-xs text-red-500">{errors.numberId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinDate">{t("creatorDatabase.joinDate")} *</Label>
                  <Input
                    id="joinDate"
                    type="text"
                    {...register("joinDate")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                    placeholder="月月 日日 年年年年"
                  />
                  {errors.joinDate && (
                    <p className="text-xs text-red-500">{errors.joinDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shorts">{t("creatorDatabase.shorts")}</Label>
                  <Input
                    id="shorts"
                    {...register("shorts")}
                    placeholder={t("creatorDatabase.enterShortsContent")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Demographics Tab */}
            <TabsContent value="demographics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">{t("creatorDatabase.gender")}</Label>
                  <Select onValueChange={(value) => setValue("gender", value)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectGender")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男性">Male</SelectItem>
                      <SelectItem value="Female">女性</SelectItem>
                      <SelectItem value="Other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">{t("creatorDatabase.age")}</Label>
                  <Input
                    id="age"
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    placeholder={t("creatorDatabase.enterAge")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthday">{t("creatorDatabase.birthday")}</Label>
                  <Input
                    id="birthday"
                    type="text"
                    {...register("birthday")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                    placeholder="月月 日日 年年年年"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">{t("creatorDatabase.occupation")}</Label>
                  <Select onValueChange={(value) => setValue("occupation", value)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.enterOccupation")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="正社員">正社員</SelectItem>
                      <SelectItem value="契約写真">契約写真</SelectItem>
                      <SelectItem value="業務委託系">業務委託系</SelectItem>
                      <SelectItem value="アルバイト">アルバイト</SelectItem>
                      <SelectItem value="無し">無し</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobDescription">{t("creatorDatabase.jobDescription")}</Label>
                  <Input
                    id="jobDescription"
                    {...register("jobDescription")}
                    placeholder={t("creatorDatabase.enterJobDescription")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">{t("creatorDatabase.maritalStatus")}</Label>
                  <Select onValueChange={(value) => setValue("maritalStatus", value)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectMaritalStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">未婚</SelectItem>
                      <SelectItem value="Married">既婚</SelectItem>
                      <SelectItem value="Divorced">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Personality Tab */}
            <TabsContent value="personality" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">{t("creatorDatabase.type")}</Label>
                  <Select onValueChange={(value) => setValue("type", value as any)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idol">Idol</SelectItem>
                      <SelectItem value="Calm">Calm</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Talent">Talent</SelectItem>
                      <SelectItem value="Men">Men</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="streamingEnvironment">{t("creatorDatabase.streamingEnvironment")}</Label>
                  <Input
                    id="streamingEnvironment"
                    {...register("streamingEnvironment")}
                    placeholder={t("creatorDatabase.enterStreamingEnvironment")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communicationSkill">{t("creatorDatabase.communicationSkill")}</Label>
                  <Select onValueChange={(value) => setValue("communicationSkill", value as any)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectCommunicationSkill")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="高">高</SelectItem>
                      <SelectItem value="普通">普通</SelectItem>
                      <SelectItem value="低">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="innerQualities">{t("creatorDatabase.innerQualities")}</Label>
                  <Input
                    id="innerQualities"
                    {...register("innerQualities")}
                    placeholder={t("creatorDatabase.enterInnerQualities")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cheerfulness">{t("creatorDatabase.cheerfulness")}</Label>
                  <Input
                    id="cheerfulness"
                    {...register("cheerfulness")}
                    placeholder={t("creatorDatabase.enterCheerfulnessLevel")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningAbility">{t("creatorDatabase.learningAbility")}</Label>
                  <Input
                    id="learningAbility"
                    {...register("learningAbility")}
                    placeholder={t("creatorDatabase.enterLearningAbility")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productionSkills">{t("creatorDatabase.productionSkills")}</Label>
                  <Input
                    id="productionSkills"
                    {...register("productionSkills")}
                    placeholder={t("creatorDatabase.enterProductionSkills")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Agency Info Tab */}
            <TabsContent value="agency" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inPart">{t("creatorDatabase.inPart")} *</Label>
                  <Select onValueChange={(value) => setValue("inPart", value as any)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectInPart")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Inhouse">Inhouse</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.inPart && (
                    <p className="text-xs text-red-500">{errors.inPart.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group">{t("creatorDatabase.group")} *</Label>
                  <Input
                    id="group"
                    {...register("group")}
                    placeholder={t("creatorDatabase.enterGroup")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.group && (
                    <p className="text-xs text-red-500">{errors.group.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">{t("creatorDatabase.unit")} *</Label>
                  <Input
                    id="unit"
                    {...register("unit")}
                    placeholder={t("creatorDatabase.enterUnit")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                  {errors.unit && (
                    <p className="text-xs text-red-500">{errors.unit.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactChannel">{t("creatorDatabase.contactChannel")}</Label>
                  <Input
                    id="contactChannel"
                    {...register("contactChannel")}
                    placeholder={t("creatorDatabase.enterContactChannel")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channelDetail">{t("creatorDatabase.channelDetail")}</Label>
                  <Input
                    id="channelDetail"
                    {...register("channelDetail")}
                    placeholder={t("creatorDatabase.enterChannelDetail")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recruiter">{t("creatorDatabase.recruiter")}</Label>
                  <Input
                    id="recruiter"
                    {...register("recruiter")}
                    placeholder={t("creatorDatabase.enterRecruiter")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managerId">{t("creatorDatabase.managerId")}</Label>
                  <Input
                    id="managerId"
                    {...register("managerId")}
                    placeholder={t("creatorDatabase.enterManagerId")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Dream Info Tab */}
            <TabsContent value="dream" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dream">{t("creatorDatabase.dream")}</Label>
                  <Input
                    id="dream"
                    {...register("dream")}
                    placeholder={t("creatorDatabase.enterDream")}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dreamDetail">{t("creatorDatabase.dreamDetail")}</Label>
                  <Textarea
                    id="dreamDetail"
                    {...register("dreamDetail")}
                    placeholder={t("creatorDatabase.enterDreamDetails")}
                    rows={4}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Status Tab */}
            <TabsContent value="status" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">{t("creatorDatabase.status")} *</Label>
                  <Select onValueChange={(value) => setValue("status", value as any)}>
                    <SelectTrigger className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                      <SelectValue placeholder={t("creatorDatabase.selectStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Trial">Trial</SelectItem>
                      <SelectItem value="Blacklist">Blacklist</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-xs text-red-500">{errors.status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">{t("creatorDatabase.notes")}</Label>
                  <Textarea
                    id="notes"
                    {...register("notes")}
                    placeholder={t("creatorDatabase.enterNotes")}
                    rows={4}
                    className="rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleClose} className="rounded-lg border-gray-200 hover:border-[#7A3CEF]">
              {t("creatorDatabase.cancel")}
            </Button>
            <Button type="submit" className="bg-[#7A3CEF] text-white hover:bg-[#5B23B4] rounded-lg">
              <Save className="mr-2 h-4 w-4" />
              {t("creatorDatabase.submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 