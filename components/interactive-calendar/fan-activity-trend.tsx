"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

export default function FanActivityTrend() {
  const { t, i18n } = useTranslation()
  
  // 根据当前语言生成数据
  const getActivityData = () => {
    const isJapanese = i18n.language === 'ja'
    
    if (isJapanese) {
      return [
        { day: "月", count: 45 },
        { day: "火", count: 38 },
        { day: "水", count: 52 },
        { day: "木", count: 40 },
        { day: "金", count: 65 },
        { day: "土", count: 78 },
        { day: "日", count: 60 },
      ]
    } else {
      return [
        { day: "Mon", count: 45 },
        { day: "Tue", count: 38 },
        { day: "Wed", count: 52 },
        { day: "Thu", count: 40 },
        { day: "Fri", count: 65 },
        { day: "Sat", count: 78 },
        { day: "Sun", count: 60 },
      ]
    }
  }

  const activityData = getActivityData()

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#7A3CEF" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
