"use client"

import { useState, useMemo, useEffect } from "react"
import { PlusCircle, Search, Filter, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TemplateCard from "./template-card"
import CreateTemplateForm from "./create-template-form"
import TemplateDetails from "./template-details"
import RelatedTasks from "./related-tasks"
import type { Template } from "@/types/template"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Sample data for demonstration
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
  // 新增15条与粉丝互动相关的真实模板
  ...[
    {
      name: "Welcome New Fan",
      variables: ["fan_name"],
      type: "AI Generated" as const,
      content: "Welcome to the community, {{fan_name}}! We're so glad to have you here.",
      createdAt: "2023-05-11T10:00:00Z"
    },
    {
      name: "Fan of the Month Announcement", 
      variables: ["fan_name"],
      type: "Custom" as const,
      content: "Congratulations {{fan_name}}! You are our Fan of the Month! Thank you for your amazing support.",
      createdAt: "2023-05-12T10:00:00Z"
    },
    {
      name: "Feedback Request",
      variables: ["fan_name", "feedback_link"],
      type: "AI Generated" as const,
      content: "Hi {{fan_name}}, we value your opinion! Please share your feedback here: {{feedback_link}}.",
      createdAt: "2023-05-13T10:00:00Z"
    },
    {
      name: "Live Stream Invitation",
      variables: ["fan_name", "stream_time", "stream_link"],
      type: "Custom" as const,
      content: "Hey {{fan_name}}, join our live stream at {{stream_time}}! Watch here: {{stream_link}}.",
      createdAt: "2023-05-14T10:00:00Z"
    },
    {
      name: "Exclusive Content Alert",
      variables: ["fan_name", "content_title", "content_link"],
      type: "AI Generated" as const,
      content: "Hi {{fan_name}}, exclusive content '{{content_title}}' is now available! Check it out: {{content_link}}.",
      createdAt: "2023-05-15T10:00:00Z"
    },
    {
      name: "Event Reminder",
      variables: ["fan_name", "event_name", "event_time"],
      type: "Custom" as const,
      content: "Don't forget, {{fan_name}}! '{{event_name}}' is happening at {{event_time}}. See you there!",
      createdAt: "2023-05-16T10:00:00Z"
    },
    {
      name: "Thank Top Supporter",
      variables: ["fan_name"],
      type: "AI Generated" as const,
      content: "{{fan_name}}, thank you for being one of our top supporters! Your dedication means a lot.",
      createdAt: "2023-05-17T10:00:00Z"
    },
    {
      name: "Newsletter Story Request",
      variables: ["fan_name", "story_link"],
      type: "Custom" as const,
      content: "Hi {{fan_name}}, do you have a story to share? Submit it for our next newsletter: {{story_link}}.",
      createdAt: "2023-05-18T10:00:00Z"
    },
    {
      name: "Fan Poll Invitation",
      variables: ["fan_name", "poll_link"],
      type: "AI Generated" as const,
      content: "Hey {{fan_name}}, help us decide! Vote in our latest poll: {{poll_link}}.",
      createdAt: "2023-05-19T10:00:00Z"
    },
    {
      name: "Birthday Coupon",
      variables: ["fan_name", "coupon_code"],
      type: "Custom" as const,
      content: "Happy Birthday, {{fan_name}}! Use coupon code {{coupon_code}} for a special gift.",
      createdAt: "2023-05-20T10:00:00Z"
    },
    {
      name: "Fan Art Submission Call",
      variables: ["fan_name", "submission_link"],
      type: "AI Generated" as const,
      content: "{{fan_name}}, show us your creativity! Submit your fan art here: {{submission_link}}.",
      createdAt: "2023-05-21T10:00:00Z"
    },
    {
      name: "Q&A Session Invite",
      variables: ["fan_name", "session_time", "session_link"],
      type: "Custom" as const,
      content: "Join our Q&A session at {{session_time}}, {{fan_name}}! Details: {{session_link}}.",
      createdAt: "2023-05-22T10:00:00Z"
    },
    {
      name: "Milestone Celebration",
      variables: ["fan_name", "milestone"],
      type: "AI Generated" as const,
      content: "We did it, {{fan_name}}! We've reached {{milestone}} together. Thank you for being part of this journey!",
      createdAt: "2023-05-23T10:00:00Z"
    },
    {
      name: "Exclusive Offer for Fans",
      variables: ["fan_name", "offer_details"],
      type: "Custom" as const,
      content: "Special for you, {{fan_name}}: {{offer_details}}. Don't miss out!",
      createdAt: "2023-05-24T10:00:00Z"
    },
    {
      name: "Fan Collaboration Opportunity",
      variables: ["fan_name", "collab_link"],
      type: "AI Generated" as const,
      content: "{{fan_name}}, want to collaborate? Check out this opportunity: {{collab_link}}.",
      createdAt: "2023-05-25T10:00:00Z"
    },
  ].map((tpl, i) => ({ id: (4 + i).toString(), ...tpl })),
]

// Sample related tasks
export const fakeChannels = ["Email", "Instagram", "Line", "X (Twitter)", "WhatsApp"];
export const fakeStatuses = ["Active", "Completed", "Disabled"];
export const fakeNames = [
  "Notify VIP Fans about New Content", "Content Drop for All Fans", "Special Content Alert", "Premium Content Push", "Morning Content Drop", "Evening Update", "Exclusive Content Alert", "Fan Appreciation Post", "Content Reminder", "All Fans Content Push", "Birthday Blast", "Donation Thank You", "Weekly Recap", "VIP Only Content", "Fan Q&A Invite", "Promotion Announcement"
];

// mockTasks 生成逻辑
export const mockTasks: Task[] = [];
sampleTemplates.forEach((tpl, tplIdx) => {
  const tplId = tpl.id;
  const taskCount = 3 + (tplIdx % 8); // 3-10条
  for (let i = 0; i < taskCount; i++) {
    mockTasks.push({
      id: `${tplId}-${i + 1}`,
      name: fakeNames[(tplIdx * 3 + i) % fakeNames.length] + (i % 2 === 0 ? "" : ` #${i + 1}`),
      templateId: tplId.toString(),
      createdAt: `2023-05-${(10 + i).toString().padStart(2, "0")}T${8 + i}:00:00Z`,
      type: ["Event", "Scheduled"][i % 2],
      triggerType: ["New Post", "Birthday", "Regular"][i % 3],
      isRecurring: i % 2 === 0,
      channels: fakeChannels.slice(0, (i % fakeChannels.length) + 1),
      timezone: ["UTC", "Personalized"][i % 2],
      status: fakeStatuses[i % fakeStatuses.length],
      notes: `Task for template ${tplId}`,
      targetFans: [], // 移除对未定义变量 fakeFanIds 的引用
      isEnabled: false,
      scheduledDate: ""
    });
  }
});

export default function SmartContent() {
  const { t, i18n } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showTemplateDetails, setShowTemplateDetails] = useState(false)
  const [showRelatedTasks, setShowRelatedTasks] = useState(false)

  // mock模板名多语言
  const templateNameMap = {
    en: [
      "Birthday Wishes","New Content Notification","Thank You for Donation","Welcome New Fan","Fan of the Month Announcement","Feedback Request","Live Stream Invitation","Exclusive Content Alert","Event Reminder","Thank Top Supporter","Newsletter Story Request","Fan Poll Invitation","Birthday Coupon","Fan Art Submission Call","Q&A Session Invite","Milestone Celebration","Exclusive Offer for Fans","Fan Collaboration Opportunity"
    ],
    ja: [
      "誕生日メッセージ","新コンテンツ通知","寄付への感謝","新規ファン歓迎","今月のファン発表","フィードバック依頼","ライブ配信招待","限定コンテンツ通知","イベントリマインダー","トップサポーターへの感謝","ニュースレター用ストーリー募集","ファン投票招待","バースデークーポン","ファンアート募集","Q&Aセッション招待","マイルストーン達成祝い","ファン限定オファー","ファンコラボ企画"
    ],
    zh: [
      "生日祝福","新内容通知","感谢打赏","欢迎新粉丝","月度粉丝公告","反馈征集","直播邀请","专属内容提醒","活动提醒","感谢顶级支持者","征集粉丝故事","粉丝投票邀请","生日优惠券","粉丝作品征集","问答环节邀请","里程碑庆祝","粉丝专属优惠","粉丝合作机会"
    ]
  }

  // 用 useMemo 生成多语言模板名
  const templatesByLang = useMemo(() => {
    const lang = i18n.language in templateNameMap ? i18n.language : 'en';
    return sampleTemplates.map((tpl, i) => ({
      ...tpl,
      name: templateNameMap[lang as keyof typeof templateNameMap][i] || tpl.name
    }))
  }, [i18n.language])
  
  // 用 useState 初始化
  const [templates, setTemplates] = useState(templatesByLang)
  
  // 监听语言变化自动同步
  useEffect(() => {
    setTemplates(templatesByLang)
  }, [templatesByLang])

  const handleCreateTemplate = (template: Template) => {
    setTemplates([...templates, { ...template, id: (templates.length + 1).toString() }])
    setShowCreateForm(false)
  }

  const handleViewDetails = (template: Template) => {
    setSelectedTemplate(template)
    setShowTemplateDetails(true)
  }

  const handleViewRelatedTasks = (template: Template) => {
    setSelectedTemplate(template)
    setShowRelatedTasks(true)
  }

  const handleRemoveTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
    if (selectedTemplate?.id === id) {
      setShowTemplateDetails(false)
      setShowRelatedTasks(false)
    }
  }

  // Filter templates based on search query and filters
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.variables.some((variable) => variable.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = filterType === "all" || template.type === filterType

    return matchesSearch && matchesType
  })

  // Sort templates based on sort option
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "createdAt") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  // 分页逻辑
  const totalPages = Math.ceil(sortedTemplates.length / pageSize)
  const pagedTemplates = sortedTemplates.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Get related tasks for a template（mockTasks 统计）
  const getRelatedTasks = (templateId: string) => {
    return mockTasks.filter((task) => task.templateId === templateId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{t('smartContent')}</h2>
        <Button onClick={() => setShowCreateForm(true)} className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('createTemplate')}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t('searchTemplates')}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t('type')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allTypes')}</SelectItem>
              <SelectItem value="Custom">{t('customTemplate')}</SelectItem>
              <SelectItem value="AI Generated">{t('aiGenerated')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SortDesc className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t('recentFirst')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">{t('recentFirst')}</SelectItem>
              <SelectItem value="name">{t('nameAZ')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pagedTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onViewDetails={() => handleViewDetails(template)}
            onViewRelatedTasks={() => handleViewRelatedTasks(template)}
            onRemove={() => handleRemoveTemplate(template.id)}
            relatedTasksCount={getRelatedTasks(template.id).length}
          />
        ))}
      </div>

      {sortedTemplates.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg bg-white">
          <p className="text-gray-500">{t('noTemplatesFound')}</p>
        </div>
      )}

      {showCreateForm && (
        <CreateTemplateForm onSubmit={handleCreateTemplate} onCancel={() => setShowCreateForm(false)} />
      )}

      {showTemplateDetails && selectedTemplate && (
        <TemplateDetails
          template={selectedTemplate}
          onClose={() => setShowTemplateDetails(false)}
          onViewRelatedTasks={() => {
            setShowTemplateDetails(false)
            setShowRelatedTasks(true)
          }}
          onRemove={() => {
            handleRemoveTemplate(selectedTemplate.id)
            setShowTemplateDetails(false)
          }}
        />
      )}

      {showRelatedTasks && selectedTemplate && (
        <RelatedTasks
          template={selectedTemplate}
          tasks={getRelatedTasks(selectedTemplate.id)}
          onClose={() => setShowRelatedTasks(false)}
        />
      )}

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            {t('prev')}
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
            {t('next')}
          </Button>
        </div>
      )}
    </div>
  )
}
