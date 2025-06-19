"use client"

import { useState } from "react"
import { UserPlus, Upload, RefreshCw, Search, Filter, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FanCard from "./fan-card"
import AddFanForm from "./add-fan-form"
import FanDetails from "./fan-details"
import InteractionLog from "./interaction-log"
import BatchImport from "./batch-import"
import AutoSync from "./auto-sync"
import AddTagModal from "./add-tag-modal"
import type { Fan, FanTag } from "@/types/fan"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Sample data for demonstration
const sampleFans: Fan[] = [
  // 日文粉丝（60%）
  {
    id: "1",
    nickname: "さくら",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    handle: "@さくら",
    priority: "P1",
    gender: "Female",
    birthday: "1995-05-15",
    country: "Japan",
    language: "Japanese",
    email: "sakura@example.com",
    line: "sakura_line",
    twitter: "@さくら_tw",
    whatsapp: "",
    instagram: "@さくら_ig",
    tags: [
      { label: "スーパー応援", color: "#FFD700" },
      { label: "VIP", color: "#A5B4FC" }
    ],
    notes: "いつも応援してくれる心強いファン。",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    lastInteractedAt: "2023-05-18T09:15:00Z",
    lastInteractionChannel: "Instagram",
    interactionCount7d: 12,
    lastCommentText: "新しい投稿楽しみにしています！",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "2",
    nickname: "たけし",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "YouTube",
    handle: "@たけし",
    priority: "P2",
    gender: "Male",
    birthday: "1990-08-22",
    country: "Japan",
    language: "Japanese",
    email: "takeshi@example.com",
    line: "",
    twitter: "@たけし",
    whatsapp: "",
    instagram: "",
    tags: [
      { label: "クリエイター", color: "#FFB7C5" },
      { label: "時々", color: "#FFE1E1" }
    ],
    notes: "動画編集が得意な友人。",
    createdAt: "2023-02-10T08:20:00Z",
    updatedAt: "2023-05-15T11:30:00Z",
    lastInteractedAt: "2023-05-10T16:45:00Z",
    lastInteractionChannel: "YouTube",
    interactionCount7d: 3,
    lastCommentText: "コラボ動画またやりたいね！",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "3",
    nickname: "美咲",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "TikTok",
    handle: "@みさき",
    priority: "P0",
    gender: "Female",
    birthday: "1998-12-03",
    country: "Japan",
    language: "Japanese",
    email: "",
    line: "misaki_line",
    twitter: "@みさき",
    whatsapp: "",
    instagram: "@みさき_ig",
    tags: [
      { label: "寄付者", color: "#FFA500" },
      { label: "VIP", color: "#A5B4FC" }
    ],
    notes: "ライブ配信でよくギフトを送ってくれる。",
    createdAt: "2022-11-05T09:10:00Z",
    updatedAt: "2023-05-19T13:25:00Z",
    lastInteractedAt: "2023-05-19T13:25:00Z",
    lastInteractionChannel: "TikTok",
    interactionCount7d: 18,
    lastCommentText: "配信楽しかったです！",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "4",
    nickname: "りんご",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "OnlyFans",
    handle: "@りんご",
    priority: "P1",
    gender: "Female",
    birthday: "1997-03-21",
    country: "Japan",
    language: "Japanese",
    email: "ringo@example.com",
    line: "",
    twitter: "@りんご",
    whatsapp: "",
    instagram: "@りんご_ig",
    tags: [
      { label: "VIP", color: "#A5B4FC" },
      { label: "サポーター", color: "#FBCFE8" }
    ],
    notes: "いつもコメントをくれる優しいファン。",
    createdAt: "2023-03-01T10:00:00Z",
    updatedAt: "2023-05-10T10:00:00Z",
    lastInteractedAt: "2023-05-10T10:00:00Z",
    lastInteractionChannel: "OnlyFans",
    interactionCount7d: 8,
    lastCommentText: "素敵な写真ありがとう！",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "5",
    nickname: "ゆうた",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "TikTok",
    handle: "@ゆうた",
    priority: "P2",
    gender: "Male",
    birthday: "1992-11-11",
    country: "Japan",
    language: "Japanese",
    email: "yuta@example.com",
    line: "yuta_line",
    twitter: "@ゆうた",
    whatsapp: "",
    instagram: "",
    tags: [
      { label: "スーパー応援", color: "#FFD700" },
      { label: "アクティブ", color: "#FBCFE8" }
    ],
    notes: "動画をよくシェアしてくれる。",
    createdAt: "2023-02-01T09:00:00Z",
    updatedAt: "2023-05-11T09:00:00Z",
    lastInteractedAt: "2023-05-11T09:00:00Z",
    lastInteractionChannel: "TikTok",
    interactionCount7d: 15,
    lastCommentText: "最新動画シェアしました！",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "6",
    nickname: "あやか",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    handle: "@あやか",
    priority: "P3",
    gender: "Female",
    birthday: "1999-07-07",
    country: "Japan",
    language: "Japanese",
    email: "ayaka@example.com",
    line: "",
    twitter: "",
    whatsapp: "",
    instagram: "@あやか",
    tags: [
      { label: "VIP", color: "#A5B4FC" }
    ],
    notes: "ストーリーが大好き。",
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-05-12T08:00:00Z",
    lastInteractedAt: "2023-05-12T08:00:00Z",
    lastInteractionChannel: "Instagram",
    interactionCount7d: 5,
    lastCommentText: "素敵なストーリー！",
    isDmSupported: true,
    isFollowing: false,
  },
  // 英文粉丝（40%）
  {
    id: "7",
    nickname: "Chris Green",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Line",
    handle: "@chrisgreen",
    priority: "P4",
    gender: "Male",
    birthday: "1988-09-09",
    country: "USA",
    language: "English",
    email: "",
    line: "chris_line",
    twitter: "",
    whatsapp: "",
    instagram: "",
    tags: [
      { label: "Occasional", color: "#FFE1E1" }
    ],
    notes: "Rarely interacts.",
    createdAt: "2023-01-01T07:00:00Z",
    updatedAt: "2023-05-13T07:00:00Z",
    lastInteractedAt: "2023-05-13T07:00:00Z",
    lastInteractionChannel: "Line",
    interactionCount7d: 1,
    lastCommentText: "",
    isDmSupported: false,
    isFollowing: false,
  },
  {
    id: "8",
    nickname: "Anna Blue",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "Instagram",
    handle: "@annablue",
    priority: "P3",
    gender: "Female",
    birthday: "1999-07-07",
    country: "France",
    language: "French",
    email: "anna@example.com",
    line: "",
    twitter: "",
    whatsapp: "",
    instagram: "@annablue",
    tags: [
      { label: "VIP", color: "#A5B4FC" }
    ],
    notes: "Loves stories.",
    createdAt: "2023-04-01T08:00:00Z",
    updatedAt: "2023-05-12T08:00:00Z",
    lastInteractedAt: "2023-05-12T08:00:00Z",
    lastInteractionChannel: "Instagram",
    interactionCount7d: 5,
    lastCommentText: "Nice story!",
    isDmSupported: true,
    isFollowing: false,
  },
  {
    id: "9",
    nickname: "Oscar Wave",
    avatar: "/placeholder.svg?height=100&width=100",
    platform: "YouTube",
    handle: "@oscarwave",
    priority: "P4",
    gender: "Male",
    birthday: "1990-12-12",
    country: "USA",
    language: "English",
    email: "",
    line: "",
    twitter: "@oscarwave",
    whatsapp: "",
    instagram: "",
    tags: [
      { label: "Content Creator", color: "#FFB7C5" },
      { label: "Occasional", color: "#FFE1E1" }
    ],
    notes: "Edits videos for fun.",
    createdAt: "2023-02-10T08:20:00Z",
    updatedAt: "2023-05-15T11:30:00Z",
    lastInteractedAt: "2023-05-10T16:45:00Z",
    lastInteractionChannel: "YouTube",
    interactionCount7d: 2,
    lastCommentText: "Cool edit!",
    isDmSupported: true,
    isFollowing: true,
  },
  {
    id: "10",
    nickname: "Jenny Love",
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
      { label: "VIP", color: "#A5B4FC" },
      { label: "Active", color: "#FBCFE8" }
    ],
    notes: "Very active supporter, comments on every post.",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
    lastInteractedAt: "2023-05-18T09:15:00Z",
    lastInteractionChannel: "Instagram",
    interactionCount7d: 12,
    lastCommentText: "Love your new content! Keep it up!",
    isDmSupported: true,
    isFollowing: true,
  },
  // 新增20条假数据
  ...Array.from({ length: 20 }, (_, i) => {
    const id = (14 + i).toString();
    return {
      id,
      nickname: `Fan${id}`,
      avatar: "/placeholder.svg?height=100&width=100",
      platform: ["Instagram", "YouTube", "TikTok", "OnlyFans", "Line", "WhatsApp", "X"][i % 7],
      handle: `@fan${id}`,
      priority: ["P0", "P1", "P2", "P3", "P4"][i % 5],
      gender: ["Female", "Male", "Other"][i % 3],
      birthday: `199${i % 10}-0${(i % 9) + 1}-1${i % 9}`,
      country: ["USA", "Japan", "UK", "France", "Brazil"][i % 5],
      language: ["English", "Japanese", "French", "Portuguese"][i % 4],
      email: `fan${id}@example.com`,
      line: i % 2 === 0 ? `fan${id}_line` : "",
      twitter: i % 2 === 1 ? `@fan${id}_tw` : "",
      whatsapp: i % 3 === 0 ? `+1234567${id}` : "",
      instagram: i % 2 === 0 ? `@fan${id}_ig` : "",
      tags: [
        { label: ["VIP", "Active", "Supporter", "Super Fan", "Donator", "Content Creator", "Occasional"][i % 7], color: ["#A5B4FC", "#FBCFE8", "#FFD700", "#FFA500", "#FFB7C5", "#FFE1E1"][i % 6] }
      ],
      notes: `Auto-generated fan ${id}`,
      createdAt: `2023-05-${(i % 28) + 1}T0${i % 10}:00:00Z`,
      updatedAt: `2023-05-${(i % 28) + 1}T1${i % 10}:00:00Z`,
      lastInteractedAt: `2023-05-${(i % 28) + 1}T2${i % 10}:00:00Z`,
      lastInteractionChannel: ["Instagram", "YouTube", "TikTok", "OnlyFans", "Line", "WhatsApp", "X"][i % 7],
      interactionCount7d: (i * 3) % 20,
      lastCommentText: `Comment from fan${id}`,
      isDmSupported: i % 2 === 0,
      isFollowing: i % 3 !== 0,
    }
  }),
]

export default function FansDatabase() {
  const { t } = useTranslation()
  const [fans, setFans] = useState<Fan[]>(sampleFans)
  const [showAddFanForm, setShowAddFanForm] = useState(false)
  const [showBatchImport, setShowBatchImport] = useState(false)
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null)
  const [showFanDetails, setShowFanDetails] = useState(false)
  const [showInteractionLog, setShowInteractionLog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("lastInteractedAt")
  const [filterPriority, setFilterPriority] = useState("all")
  const [showAddTagModal, setShowAddTagModal] = useState(false)
  const [addTagFanId, setAddTagFanId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 12

  const handleAddFan = (fan: Fan) => {
    setFans([...fans, { ...fan, id: (fans.length + 1).toString() }])
    setShowAddFanForm(false)
  }

  const handleViewDetails = (fan: Fan) => {
    setSelectedFan(fan)
    setShowFanDetails(true)
  }

  const handleViewInteractionLog = (fan: Fan) => {
    setSelectedFan(fan)
    setShowInteractionLog(true)
  }

  const handleRemoveFan = (id: string) => {
    setFans(fans.filter((fan) => fan.id !== id))
    if (selectedFan?.id === id) {
      setShowFanDetails(false)
      setShowInteractionLog(false)
    }
  }

  const handleAddTag = (fanId: string, tag: FanTag) => {
    setFans((prev) => prev.map(fan => fan.id === fanId ? { ...fan, tags: [...fan.tags, tag] } : fan))
  }

  // Filter fans based on search query and filters
  const filteredFans = fans.filter((fan) => {
    const matchesSearch =
      fan.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fan.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fan.tags.some((tag) => tag.label.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPriority = filterPriority === "all" || fan.priority === filterPriority

    return matchesSearch && matchesPriority
  })

  // Sort fans based on sort option
  const sortedFans = [...filteredFans].sort((a, b) => {
    if (sortBy === "lastInteractedAt") {
      return new Date(b.lastInteractedAt).getTime() - new Date(a.lastInteractedAt).getTime()
    } else if (sortBy === "nickname") {
      return a.nickname.localeCompare(b.nickname)
    } else if (sortBy === "interactionCount7d") {
      return b.interactionCount7d - a.interactionCount7d
    }
    return 0
  })

  // 分页逻辑
  const totalPages = Math.ceil(sortedFans.length / pageSize)
  const pagedFans = sortedFans.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{t("fansDatabase.title")}</h2>
        <div className="flex space-x-3">
          <Button onClick={() => setShowAddFanForm(true)} className="btn-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            {t("fansDatabase.addFan")}
          </Button>
          <Button onClick={() => setShowBatchImport(true)} className="btn-primary">
            <Upload className="mr-2 h-4 w-4" />
            {t("fansDatabase.batchImport")}
          </Button>
          <Button className="btn-primary">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t("fansDatabase.autoSync")}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t("fansDatabase.searchPlaceholder")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t("fansDatabase.priorityPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("fansDatabase.allPriorities")}</SelectItem>
              <SelectItem value="P0">P0</SelectItem>
              <SelectItem value="P1">P1</SelectItem>
              <SelectItem value="P2">P2</SelectItem>
              <SelectItem value="P3">P3</SelectItem>
              <SelectItem value="P4">P4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <SortDesc className="h-4 w-4 text-gray-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("fansDatabase.sortByPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastInteractedAt">{t("fansDatabase.recentInteraction")}</SelectItem>
              <SelectItem value="nickname">{t("fansDatabase.nameAZ")}</SelectItem>
              <SelectItem value="interactionCount7d">{t("fansDatabase.7DayInteractions")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pagedFans.map((fan) => (
          <FanCard
            key={fan.id}
            fan={fan}
            onViewDetails={() => handleViewDetails(fan)}
            onViewInteractionLog={() => handleViewInteractionLog(fan)}
            onRemove={() => handleRemoveFan(fan.id)}
            onAddTag={() => { setAddTagFanId(fan.id); setShowAddTagModal(true); }}
          />
        ))}
      </div>

      {sortedFans.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg bg-white">
          <p className="text-gray-500">{t("fansDatabase.noFansFound")}</p>
        </div>
      )}

      {showAddFanForm && <AddFanForm onSubmit={handleAddFan} onCancel={() => setShowAddFanForm(false)} />}

      {showBatchImport && <BatchImport onClose={() => setShowBatchImport(false)} />}

      {showFanDetails && selectedFan && (
        <FanDetails
          fan={selectedFan}
          onClose={() => setShowFanDetails(false)}
          onViewInteractionLog={() => {
            setShowFanDetails(false)
            setShowInteractionLog(true)
          }}
          onRemove={() => {
            handleRemoveFan(selectedFan.id)
            setShowFanDetails(false)
          }}
        />
      )}

      {showInteractionLog && selectedFan && (
        <InteractionLog fan={selectedFan} onClose={() => setShowInteractionLog(false)} />
      )}

      {showAddTagModal && addTagFanId && (
        <AddTagModal
          onClose={() => setShowAddTagModal(false)}
          onAdd={(tag) => { handleAddTag(addTagFanId, tag); setShowAddTagModal(false); }}
        />
      )}

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            {t("fansDatabase.prev")}
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
            {t("fansDatabase.next")}
          </Button>
        </div>
      )}
    </div>
  )
}
