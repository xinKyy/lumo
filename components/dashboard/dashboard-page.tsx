"use client"

import { useState } from "react"
import {
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  Bell,
  Heart,
  Eye,
  DollarSign,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Mock data for the dashboard
const overviewStats = [
  {
    title: "Total Fans",
    value: "2,845",
    change: "+12.5%",
    isPositive: true,
    icon: <Users className="h-4 w-4" />,
    color: "bg-[#7A3CEF]",
  },
  {
    title: "Active Engagement",
    value: "68.2%",
    change: "+5.3%",
    isPositive: true,
    icon: <Heart className="h-4 w-4" />,
    color: "bg-[#F56DB6]",
  },
  {
    title: "Content Views",
    value: "24.5K",
    change: "+18.7%",
    isPositive: true,
    icon: <Eye className="h-4 w-4" />,
    color: "bg-[#32C48D]",
  },
  {
    title: "Revenue",
    value: "$3,842",
    change: "-2.4%",
    isPositive: false,
    icon: <DollarSign className="h-4 w-4" />,
    color: "bg-[#FFB300]",
  },
]

const recentFanActivity = [
  {
    id: "1",
    fanName: "JennyLove",
    avatar: "/placeholder.svg?height=40&width=40",
    action: "commented on your post",
    content: "Love your new content! Keep it up!",
    time: "5 minutes ago",
    platform: "Instagram",
  },
  {
    id: "2",
    fanName: "MikeRunner",
    avatar: "/placeholder.svg?height=40&width=40",
    action: "subscribed to your premium tier",
    content: "$15.99/month subscription",
    time: "2 hours ago",
    platform: "OnlyFans",
  },
  {
    id: "3",
    fanName: "SakuraChan",
    avatar: "/placeholder.svg?height=40&width=40",
    action: "donated during your stream",
    content: "$50.00 donation with message: 'You're amazing!'",
    time: "Yesterday",
    platform: "TikTok",
  },
  {
    id: "4",
    fanName: "TomCruise",
    avatar: "/placeholder.svg?height=40&width=40",
    action: "shared your post",
    content: "Check out this amazing creator!",
    time: "Yesterday",
    platform: "X (Twitter)",
  },
]

const upcomingTasks = [
  {
    id: "1",
    name: "Send Birthday Wishes",
    time: "Today, 10:00 AM",
    targetCount: 3,
    status: "Pending",
  },
  {
    id: "2",
    name: "Post New Content Announcement",
    time: "Today, 2:00 PM",
    targetCount: 2845,
    status: "Scheduled",
  },
  {
    id: "3",
    name: "Thank Top Supporters",
    time: "Tomorrow, 11:00 AM",
    targetCount: 12,
    status: "Scheduled",
  },
]

const contentPerformance = [
  {
    id: "1",
    title: "Summer Photoshoot Behind the Scenes",
    type: "Video",
    views: 12500,
    engagement: 8.7,
    revenue: 320,
    platform: "YouTube",
  },
  {
    id: "2",
    title: "Exclusive Bikini Collection",
    type: "Photo Gallery",
    views: 8900,
    engagement: 12.3,
    revenue: 450,
    platform: "OnlyFans",
  },
  {
    id: "3",
    title: "Morning Routine Q&A",
    type: "Live Stream",
    views: 6700,
    engagement: 15.2,
    revenue: 280,
    platform: "Instagram",
  },
]

const fanGrowthData = [
  { month: "Jan", fans: 1850 },
  { month: "Feb", fans: 1950 },
  { month: "Mar", fans: 2100 },
  { month: "Apr", fans: 2250 },
  { month: "May", fans: 2400 },
  { month: "Jun", fans: 2650 },
  { month: "Jul", fans: 2845 },
]

const engagementData = [
  { day: "Mon", comments: 45, likes: 120, shares: 15 },
  { day: "Tue", comments: 38, likes: 100, shares: 12 },
  { day: "Wed", comments: 52, likes: 140, shares: 18 },
  { day: "Thu", comments: 40, likes: 90, shares: 10 },
  { day: "Fri", comments: 65, likes: 160, shares: 22 },
  { day: "Sat", comments: 78, likes: 200, shares: 28 },
  { day: "Sun", comments: 60, likes: 150, shares: 20 },
]

const platformDistribution = [
  { platform: "Instagram", percentage: 35 },
  { platform: "OnlyFans", percentage: 25 },
  { platform: "TikTok", percentage: 20 },
  { platform: "YouTube", percentage: 12 },
  { platform: "X (Twitter)", percentage: 8 },
]

const topFans = [
  {
    id: "1",
    nickname: "SakuraChan",
    avatar: "/placeholder.svg?height=40&width=40",
    platform: "TikTok",
    priority: "P0",
    totalSpent: "$350",
    lastActive: "Today",
  },
  {
    id: "2",
    nickname: "JennyLove",
    avatar: "/placeholder.svg?height=40&width=40",
    platform: "Instagram",
    priority: "P1",
    totalSpent: "$220",
    lastActive: "Yesterday",
  },
  {
    id: "3",
    nickname: "MikeRunner",
    avatar: "/placeholder.svg?height=40&width=40",
    platform: "YouTube",
    priority: "P1",
    totalSpent: "$180",
    lastActive: "2 days ago",
  },
  {
    id: "4",
    nickname: "AlexStar",
    avatar: "/placeholder.svg?height=40&width=40",
    platform: "OnlyFans",
    priority: "P2",
    totalSpent: "$150",
    lastActive: "Today",
  },
  {
    id: "5",
    nickname: "RobertKing",
    avatar: "/placeholder.svg?height=40&width=40",
    platform: "OnlyFans",
    priority: "P2",
    totalSpent: "$120",
    lastActive: "3 days ago",
  },
]

const aiInsights = [
  {
    id: "1",
    title: "Engagement Opportunity",
    description:
      "Your fans are most active between 7-9 PM. Consider scheduling your posts during this time for maximum engagement.",
    type: "timing",
  },
  {
    id: "2",
    title: "Content Recommendation",
    description:
      "Behind-the-scenes content is performing 35% better than your regular posts. Consider creating more of this type of content.",
    type: "content",
  },
  {
    id: "3",
    title: "Re-engagement Alert",
    description:
      "15 previously active fans haven't engaged in the last 30 days. Consider sending them a personalized message.",
    type: "fans",
  },
]

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const [timeRange, setTimeRange] = useState("7d")

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P0":
        return "bg-[#FF4D4F] text-white"
      case "P1":
        return "bg-[#FFB300] text-white"
      case "P2":
        return "bg-[#7A3CEF] text-white"
      case "P3":
        return "bg-[#32C48D] text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  // mock数据title/status/type/action等国际化
  const overviewStatsI18n = overviewStats.map(stat => ({
    ...stat,
    title: t(stat.title),
  }))
  const recentFanActivityI18n = recentFanActivity.map(a => ({
    ...a,
    action: t(a.action),
    platform: t(a.platform),
  }))
  const upcomingTasksI18n = upcomingTasks.map(task => ({
    ...task,
    name: t(task.name),
    status: t(task.status),
  }))
  const contentPerformanceI18n = contentPerformance.map(c => ({
    ...c,
    title: t(c.title),
    type: t(c.type),
    platform: t(c.platform),
  }))
  const topFansI18n = topFans.map(fan => ({
    ...fan,
    platform: t(fan.platform),
    lastActive: t(fan.lastActive),
  }))
  const aiInsightsI18n = aiInsights.map(insight => ({
    ...insight,
    title: t(insight.title),
    description: t(insight.description),
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{t('dashboard')}</h2>
        <div className="flex items-center space-x-3">
          <Button className="btn-primary">
            <Bell className="mr-2 h-4 w-4" />
            {t('notifications')}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStatsI18n.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <div className="flex items-end space-x-1">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span
                      className={`flex items-center text-xs ${stat.isPositive ? "text-[#32C48D]" : "text-[#FF4D4F]"}`}
                    >
                      {stat.isPositive ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Fan Growth Chart - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>{t('fanGrowth')}</CardTitle>
              <CardDescription>{t('totalFansOverTime')}</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-1 h-4 w-4" />
                {t('filter')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fanGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="fans" stroke="#7A3CEF" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('platformDistribution')}</CardTitle>
            <CardDescription>{t('whereYourFans')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformDistribution.map((platform) => (
                <div key={platform.platform} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{platform.platform}</span>
                    <span className="text-sm text-gray-500">{platform.percentage}%</span>
                  </div>
                  <Progress value={platform.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Fan Activity and Upcoming Tasks - Two-column layout */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Fan Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{t('recentFanActivity')}</CardTitle>
                <CardDescription>{t('latestInteractions')}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#7A3CEF]">
                {t('viewAll')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFanActivityI18n.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.fanName} />
                      <AvatarFallback className="bg-[#7A3CEF] text-white">
                        {activity.fanName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{activity.fanName}</span>
                        <Badge variant="outline" className="bg-[#F5F5F5]">
                          {activity.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="text-gray-500">{activity.action}:</span> {activity.content}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{t('upcomingTasks')}</CardTitle>
                <CardDescription>{t('scheduledTasks')}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-[#7A3CEF]">
                {t('viewCalendar')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasksI18n.map((task) => (
                  <div key={task.id} className="rounded-md border border-gray-200 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-[#7A3CEF]" />
                          <span className="font-medium">{task.name}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {task.time} • {task.targetCount} {task.targetCount === 1 ? "fan" : "fans"}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#F5F5F5] text-[#7A3CEF]">
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="engagement">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t('engagementMetrics')}</CardTitle>
                  <CardDescription>{t('fanInteraction')}</CardDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="engagement">{t('engagement')}</TabsTrigger>
                  <TabsTrigger value="content">{t('content')}</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="engagement" className="mt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="likes" fill="#7A3CEF" name="Likes" />
                      <Bar dataKey="comments" fill="#F56DB6" name="Comments" />
                      <Bar dataKey="shares" fill="#32C48D" name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="content" className="mt-0">
                <div className="space-y-4">
                  {contentPerformanceI18n.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{content.title}</span>
                          <Badge variant="outline" className="bg-[#F5F5F5]">
                            {content.platform}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {content.type} • {content.views.toLocaleString()} views • ${content.revenue} revenue
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{content.engagement}%</span>
                        <div className="text-[#32C48D]">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Top Fans */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>{t('topFans')}</CardTitle>
              <CardDescription>{t('mostValuableSupporters')}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#7A3CEF]">
              {t('viewAll')}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFansI18n.map((fan) => (
                <div key={fan.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={fan.avatar || "/placeholder.svg"} alt={fan.nickname} />
                      <AvatarFallback className="bg-[#7A3CEF] text-white">
                        {fan.nickname.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{fan.nickname}</span>
                        <Badge className={getPriorityColor(fan.priority)}>{fan.priority}</Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {fan.platform} • {t(fan.lastActive)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{fan.totalSpent}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>{t('aiInsights')}</CardTitle>
            <CardDescription>{t('smartRecommendations')}</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-[#7A3CEF] text-[#7A3CEF]">
            <Sparkles className="mr-2 h-4 w-4" />
            {t('generateMoreInsights')}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {aiInsightsI18n.map((insight) => (
              <div key={insight.id} className="rounded-md border border-gray-200 p-4">
                <div className="mb-2 flex items-center space-x-2">
                  {insight.type === "timing" && <Clock className="h-5 w-5 text-[#7A3CEF]" />}
                  {insight.type === "content" && <BarChart2 className="h-5 w-5 text-[#F56DB6]" />}
                  {insight.type === "fans" && <Users className="h-5 w-5 text-[#FFB300]" />}
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-[#7A3CEF]">
                    {t('takeAction')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
