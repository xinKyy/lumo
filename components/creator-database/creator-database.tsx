"use client"

import { useState, useEffect } from "react"
import { UserPlus, Upload, Search, Filter, SortDesc, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CreatorCard from "./creator-card"
import AddCreatorForm from "./add-creator-form"
import CreatorDetails from "./creator-details"
import BatchImport from "./batch-import"
import type { Creator } from "@/types/creator"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Sample data for demonstration
const sampleCreators: Creator[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    ggtkId: "GGTK001",
    tiktokId: "@sarah.johnson_official",
    numberId: "001",
    joinDate: "2023-01-15",
    shorts: "Fashion & Lifestyle",
    gender: "Female",
    age: 25,
    birthday: "1998-05-15",
    occupation: "Content Creator",
    jobDescription: "Full-time",
    maritalStatus: "Single",
    type: "Idol",
    streamingEnvironment: "Professional Studio",
    communicationSkill: "高",
    innerQualities: "Confident",
    cheerfulness: "High",
    learningAbility: "Fast",
    productionSkills: "Advanced",
    inPart: "Partner",
    group: "Fashion Group",
    unit: "Lifestyle Unit",
    contactChannel: "Email",
    channelDetail: "sarah@agency.com",
    recruiter: "John Smith",
    managerId: "MGR001",
    dream: "Fashion Influencer",
    dreamDetail: "Become a top fashion influencer with 1M+ followers",
    status: "Active",
    notes: "Very active creator with high engagement rates",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: "2",
    name: "Mike Chen",
    ggtkId: "GGTK002",
    tiktokId: "@tech_mike_2024",
    numberId: "002",
    joinDate: "2023-02-10",
    shorts: "Tech Reviews",
    gender: "Male",
    age: 28,
    birthday: "1995-08-22",
    occupation: "Tech Reviewer",
    jobDescription: "Part-time",
    maritalStatus: "Married",
    type: "Talent",
    streamingEnvironment: "Home Setup",
    communicationSkill: "普通",
    innerQualities: "Analytical",
    cheerfulness: "Medium",
    learningAbility: "Good",
    productionSkills: "Intermediate",
    inPart: "Inhouse",
    group: "Tech Group",
    unit: "Review Unit",
    contactChannel: "Phone",
    channelDetail: "+1-555-0123",
    recruiter: "Lisa Wang",
    managerId: "MGR002",
    dream: "Tech YouTuber",
    dreamDetail: "Build a successful tech review channel",
    status: "Active",
    notes: "Great technical knowledge, improving communication skills",
    createdAt: "2023-02-10T08:20:00Z",
    updatedAt: "2024-03-19T11:30:00Z",
  },
  {
    id: "3",
    name: "Emma Davis",
    ggtkId: "GGTK003",
    tiktokId: "@emma.gaming.queen",
    numberId: "003",
    joinDate: "2023-03-01",
    shorts: "Gaming",
    gender: "Female",
    age: 22,
    birthday: "2001-12-03",
    occupation: "Gamer",
    jobDescription: "Full-time",
    maritalStatus: "Single",
    type: "Friendly",
    streamingEnvironment: "Gaming Room",
    communicationSkill: "高",
    innerQualities: "Energetic",
    cheerfulness: "Very High",
    learningAbility: "Excellent",
    productionSkills: "Basic",
    inPart: "Partner",
    group: "Gaming Group",
    unit: "Streaming Unit",
    contactChannel: "Discord",
    channelDetail: "emma#1234",
    recruiter: "Alex Brown",
    managerId: "MGR003",
    dream: "Professional Gamer",
    dreamDetail: "Compete in esports tournaments",
    status: "Trial",
    notes: "New creator, showing great potential",
    createdAt: "2023-03-01T09:10:00Z",
    updatedAt: "2024-03-18T13:25:00Z",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    ggtkId: "GGTK004",
    tiktokId: "@alex_fitness_pro",
    numberId: "004",
    joinDate: "2023-04-05",
    shorts: "Fitness & Health",
    gender: "Male",
    age: 30,
    birthday: "1993-07-14",
    occupation: "Fitness Trainer",
    jobDescription: "Full-time",
    maritalStatus: "Single",
    type: "Men",
    streamingEnvironment: "Gym Studio",
    communicationSkill: "高",
    innerQualities: "Motivational",
    cheerfulness: "High",
    learningAbility: "Good",
    productionSkills: "Intermediate",
    inPart: "Partner",
    group: "Fitness Group",
    unit: "Health Unit",
    contactChannel: "Instagram",
    channelDetail: "@alex_fitness_pro",
    recruiter: "Maria Garcia",
    managerId: "MGR004",
    dream: "Fitness Empire",
    dreamDetail: "Build a global fitness brand and community",
    status: "Active",
    notes: "Excellent engagement with fitness community",
    createdAt: "2023-04-05T11:15:00Z",
    updatedAt: "2024-03-17T16:20:00Z",
  },
  {
    id: "5",
    name: "Sophie Williams",
    ggtkId: "GGTK005",
    tiktokId: "@sophie.cooks.daily",
    numberId: "005",
    joinDate: "2023-05-12",
    shorts: "Cooking & Food",
    gender: "Female",
    age: 27,
    birthday: "1996-11-08",
    occupation: "Chef",
    jobDescription: "Part-time",
    maritalStatus: "Married",
    type: "Calm",
    streamingEnvironment: "Kitchen Studio",
    communicationSkill: "普通",
    innerQualities: "Patient",
    cheerfulness: "Medium",
    learningAbility: "Excellent",
    productionSkills: "Advanced",
    inPart: "Inhouse",
    group: "Food Group",
    unit: "Cooking Unit",
    contactChannel: "Email",
    channelDetail: "sophie@foodagency.com",
    recruiter: "David Lee",
    managerId: "MGR005",
    dream: "Celebrity Chef",
    dreamDetail: "Host cooking shows and publish cookbooks",
    status: "Active",
    notes: "Beautiful food photography and clear instructions",
    createdAt: "2023-05-12T14:30:00Z",
    updatedAt: "2024-03-16T09:45:00Z",
  },
  {
    id: "6",
    name: "James Wilson",
    ggtkId: "GGTK006",
    tiktokId: "@james_travels_365",
    numberId: "006",
    joinDate: "2023-06-20",
    shorts: "Travel & Adventure",
    gender: "Male",
    age: 29,
    birthday: "1994-03-25",
    occupation: "Travel Vlogger",
    jobDescription: "Full-time",
    maritalStatus: "Single",
    type: "Friendly",
    streamingEnvironment: "Mobile Setup",
    communicationSkill: "高",
    innerQualities: "Adventurous",
    cheerfulness: "Very High",
    learningAbility: "Fast",
    productionSkills: "Advanced",
    inPart: "Partner",
    group: "Travel Group",
    unit: "Adventure Unit",
    contactChannel: "WhatsApp",
    channelDetail: "+1-555-9876",
    recruiter: "Emma Thompson",
    managerId: "MGR006",
    dream: "Global Traveler",
    dreamDetail: "Visit every country and share experiences",
    status: "Trial",
    notes: "Amazing travel content, growing rapidly",
    createdAt: "2023-06-20T07:45:00Z",
    updatedAt: "2024-03-15T12:10:00Z",
  },
  {
    id: "7",
    name: "Lisa Park",
    ggtkId: "GGTK007",
    tiktokId: "@lisa.beauty.tips",
    numberId: "007",
    joinDate: "2023-07-08",
    shorts: "Beauty & Makeup",
    gender: "Female",
    age: 24,
    birthday: "1999-09-12",
    occupation: "Makeup Artist",
    jobDescription: "Full-time",
    maritalStatus: "Single",
    type: "Idol",
    streamingEnvironment: "Beauty Studio",
    communicationSkill: "高",
    innerQualities: "Creative",
    cheerfulness: "High",
    learningAbility: "Excellent",
    productionSkills: "Advanced",
    inPart: "Partner",
    group: "Beauty Group",
    unit: "Makeup Unit",
    contactChannel: "TikTok",
    channelDetail: "@lisa.beauty.tips",
    recruiter: "Sarah Kim",
    managerId: "MGR007",
    dream: "Beauty Mogul",
    dreamDetail: "Launch own beauty brand and products",
    status: "Active",
    notes: "Trending makeup tutorials, high engagement",
    createdAt: "2023-07-08T10:20:00Z",
    updatedAt: "2024-03-14T15:30:00Z",
  },
  {
    id: "8",
    name: "Ryan Miller",
    ggtkId: "GGTK008",
    tiktokId: "@ryan_comedy_king",
    numberId: "008",
    joinDate: "2023-08-15",
    shorts: "Comedy & Entertainment",
    gender: "Male",
    age: 26,
    birthday: "1997-12-30",
    occupation: "Comedian",
    jobDescription: "Part-time",
    maritalStatus: "Single",
    type: "Talent",
    streamingEnvironment: "Comedy Club",
    communicationSkill: "高",
    innerQualities: "Humorous",
    cheerfulness: "Very High",
    learningAbility: "Good",
    productionSkills: "Intermediate",
    inPart: "Inhouse",
    group: "Entertainment Group",
    unit: "Comedy Unit",
    contactChannel: "Phone",
    channelDetail: "+1-555-4567",
    recruiter: "Mike Johnson",
    managerId: "MGR008",
    dream: "Stand-up Star",
    dreamDetail: "Perform on major comedy stages worldwide",
    status: "Active",
    notes: "Viral comedy sketches, natural performer",
    createdAt: "2023-08-15T19:00:00Z",
    updatedAt: "2024-03-13T11:15:00Z",
  },
  {
    id: "9",
    name: "Nina Patel",
    ggtkId: "GGTK009",
    tiktokId: "@nina.yoga.life",
    numberId: "009",
    joinDate: "2023-09-22",
    shorts: "Yoga & Wellness",
    gender: "Female",
    age: 31,
    birthday: "1992-06-18",
    occupation: "Yoga Instructor",
    jobDescription: "Full-time",
    maritalStatus: "Married",
    type: "Calm",
    streamingEnvironment: "Yoga Studio",
    communicationSkill: "普通",
    innerQualities: "Peaceful",
    cheerfulness: "Medium",
    learningAbility: "Good",
    productionSkills: "Basic",
    inPart: "Partner",
    group: "Wellness Group",
    unit: "Yoga Unit",
    contactChannel: "Email",
    channelDetail: "nina@yogalife.com",
    recruiter: "Amanda Chen",
    managerId: "MGR009",
    dream: "Wellness Guru",
    dreamDetail: "Spread mindfulness and wellness globally",
    status: "Trial",
    notes: "Calming presence, excellent yoga instruction",
    createdAt: "2023-09-22T06:30:00Z",
    updatedAt: "2024-03-12T14:25:00Z",
  },
]

export default function CreatorDatabase() {
  const { t } = useTranslation()
  const [creators, setCreators] = useState<Creator[]>(sampleCreators)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShorts, setSelectedShorts] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedInPart, setSelectedInPart] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showBatchImport, setShowBatchImport] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleAddCreator = (creator: Creator) => {
    const newCreator = {
      ...creator,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setCreators([...creators, newCreator])
    setShowAddForm(false)
  }

  const handleViewDetails = (creator: Creator) => {
    setSelectedCreator(creator)
    setShowDetails(true)
  }

  const handleEditCreator = (creator: Creator) => {
    // TODO: Implement edit functionality
    console.log("Edit creator:", creator)
  }

  const handleRemoveCreator = (id: string) => {
    setCreators(creators.filter(creator => creator.id !== id))
  }

  const handleUploadPerformance = (creator: Creator) => {
    // TODO: Implement upload performance functionality
    console.log("Upload performance for:", creator)
  }

  const handleAddTask = (creator: Creator) => {
    // TODO: Implement add task functionality
    console.log("Add task for:", creator)
  }

  // Filter creators based on search and filters
  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.ggtkId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.tiktokId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesShorts = selectedShorts === "all" || !selectedShorts || creator.shorts === selectedShorts
    const matchesGender = selectedGender === "all" || !selectedGender || creator.gender === selectedGender
    const matchesType = selectedType === "all" || !selectedType || creator.type === selectedType
    const matchesInPart = selectedInPart === "all" || !selectedInPart || creator.inPart === selectedInPart
    const matchesStatus = selectedStatus === "all" || !selectedStatus || creator.status === selectedStatus

    return matchesSearch && matchesShorts && matchesGender && matchesType && matchesInPart && matchesStatus
  })

  // Sort creators
  const sortedCreators = [...filteredCreators].sort((a, b) => {
    switch (sortBy) {
      case "nameAZ":
        return a.name.localeCompare(b.name)
      case "joinDate":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Trial":
        return "bg-yellow-100 text-yellow-800"
      case "Blacklist":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Pagination
  const pageSize = 9
  const totalPages = Math.ceil(sortedCreators.length / pageSize)
  const pagedCreators = sortedCreators.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedShorts, selectedGender, selectedType, selectedInPart, selectedStatus, sortBy])

  // 清空筛选、搜索、排序
  const handleClearFilters = () => {
    setSearchTerm("")
    setSortBy("")
    setSelectedShorts("")
    setSelectedGender("")
    setSelectedType("")
    setSelectedInPart("")
    setSelectedStatus("")
  }

  return (
    <div className="space-y-6">
      {/* 顶部操作按钮区 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t("creatorDatabase.title")}</h2>
        <div className="flex space-x-3">
          <Button onClick={() => setShowAddForm(true)} className="bg-[#7A3CEF] text-white hover:bg-[#5B23B4]">
            <UserPlus className="mr-2 h-4 w-4" />
            {t("creatorDatabase.addCreator")}
          </Button>
          <Button onClick={() => setShowBatchImport(true)} variant="outline" className="border-gray-200 hover:border-[#7A3CEF]">
            <Upload className="mr-2 h-4 w-4" />
            {t("creatorDatabase.batchImport")}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm rounded-xl bg-white border border-gray-100">
        <CardContent className="p-4 md:p-6">
          {/* 第一行：搜索和排序 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 搜索框 */}
            <div className="relative col-span-1 lg:col-span-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("creatorDatabase.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]"
              />
            </div>
            {/* 排序 */}
            <div className="col-span-1 flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                  <SelectValue placeholder={t("creatorDatabase.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nameAZ">{t("creatorDatabase.nameAZ")}</SelectItem>
                  <SelectItem value="joinDate">{t("creatorDatabase.joinDate")}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="h-10 px-4 border-gray-200 hover:border-[#7A3CEF]" onClick={handleClearFilters}>
                {t("creatorDatabase.clearFilters")}
              </Button>
            </div>
          </div>
          {/* 第二行：其余筛选项（去除排序下拉框） */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Shorts Filter */}
            <Select value={selectedShorts} onValueChange={setSelectedShorts}>
              <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                <SelectValue placeholder={t("creatorDatabase.shorts")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("creatorDatabase.allShorts")}</SelectItem>
                <SelectItem value="fashionLifestyle">{t("creatorDatabase.fashionLifestyle")}</SelectItem>
                <SelectItem value="techReviews">{t("creatorDatabase.techReviews")}</SelectItem>
                <SelectItem value="gaming">{t("creatorDatabase.gaming")}</SelectItem>
              </SelectContent>
            </Select>
            {/* Gender Filter */}
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                <SelectValue placeholder={t("creatorDatabase.gender")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("creatorDatabase.allGenders")}</SelectItem>
                <SelectItem value="Male">{t("creatorDatabase.male")}</SelectItem>
                <SelectItem value="Female">{t("creatorDatabase.female")}</SelectItem>
                <SelectItem value="Other">{t("creatorDatabase.other")}</SelectItem>
              </SelectContent>
            </Select>
            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                <SelectValue placeholder={t("creatorDatabase.type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("creatorDatabase.allTypes")}</SelectItem>
                <SelectItem value="Idol">{t("creatorDatabase.idol")}</SelectItem>
                <SelectItem value="Calm">{t("creatorDatabase.calm")}</SelectItem>
                <SelectItem value="Friendly">{t("creatorDatabase.friendly")}</SelectItem>
                <SelectItem value="Talent">{t("creatorDatabase.talent")}</SelectItem>
                <SelectItem value="Men">{t("creatorDatabase.men")}</SelectItem>
              </SelectContent>
            </Select>
            {/* In-Part Filter */}
            <Select value={selectedInPart} onValueChange={setSelectedInPart}>
              <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                <SelectValue placeholder={t("creatorDatabase.inPart")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("creatorDatabase.allInPart")}</SelectItem>
                <SelectItem value="Partner">{t("creatorDatabase.partner")}</SelectItem>
                <SelectItem value="Inhouse">{t("creatorDatabase.inhouse")}</SelectItem>
              </SelectContent>
            </Select>
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-10 w-full rounded-lg border-gray-200 focus:border-[#7A3CEF] focus:ring-2 focus:ring-[#E9D8FD]">
                <SelectValue placeholder={t("creatorDatabase.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("creatorDatabase.allStatus")}</SelectItem>
                <SelectItem value="Active">{t("creatorDatabase.active")}</SelectItem>
                <SelectItem value="Inactive">{t("creatorDatabase.inactive")}</SelectItem>
                <SelectItem value="Trial">{t("creatorDatabase.trial")}</SelectItem>
                <SelectItem value="Blacklist">{t("creatorDatabase.blacklist")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 卡片区 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {pagedCreators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onViewDetails={() => handleViewDetails(creator)}
            onEdit={() => handleEditCreator(creator)}
            onRemove={() => handleRemoveCreator(creator.id)}
            onUploadPerformance={() => handleUploadPerformance(creator)}
            onAddTask={() => handleAddTask(creator)}
            getStatusColor={getStatusColor}
          />
        ))}
      </div>

      {sortedCreators.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg bg-white">
          <p className="text-gray-500">{t("creatorDatabase.noCreatorsFound")}</p>
        </div>
      )}

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            {t("creatorDatabase.prev")}
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            {t("creatorDatabase.next")}
          </Button>
        </div>
      )}

      {/* Add Creator Form */}
      {showAddForm && (
        <AddCreatorForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddCreator}
        />
      )}

      {/* Batch Import */}
      {showBatchImport && (
        <BatchImport
          onClose={() => setShowBatchImport(false)}
          onImport={(importedCreators) => {
            setCreators([...creators, ...importedCreators])
            setShowBatchImport(false)
          }}
        />
      )}

      {/* Creator Details */}
      {showDetails && selectedCreator && (
        <CreatorDetails
          creator={selectedCreator}
          onClose={() => {
            setShowDetails(false)
            setSelectedCreator(null)
          }}
          onEdit={handleEditCreator}
          onRemove={handleRemoveCreator}
          onUploadPerformance={handleUploadPerformance}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  )
} 