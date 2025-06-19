"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface TaskCalendarProps {
  tasks: Task[]
  onTaskClick: (task: Task) => void
  onDateClick: (date: Date) => void
}

function getTaskColorClass(task: Task) {
  // 优先根据triggerType和name判断
  if (task.triggerType === "Birthday") {
    return "bg-rose-200 text-rose-800";
  }
  if (task.triggerType === "New Post") {
    return "bg-indigo-200 text-indigo-800";
  }
  if (task.triggerType === "Regular" && task.name.toLowerCase().includes("newsletter")) {
    return "bg-violet-200 text-violet-800";
  }
  if (task.triggerType === "Regular" && task.name.toLowerCase().includes("promotion")) {
    return "bg-emerald-200 text-emerald-800";
  }
  return "bg-amber-200 text-amber-800";
}

export default function TaskCalendar({ tasks, onTaskClick, onDateClick }: TaskCalendarProps) {
  const { t, i18n } = useTranslation()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    const monthName = i18n.language === 'ja' ? 
      currentMonth.toLocaleString("ja-JP", { month: "long" }) :
      currentMonth.toLocaleString("en-US", { month: "long" })

    // Create array of days in month
    const days = []
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    // Create blank spaces for days before first day of month
    const blanks = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(i)
    }

    // Get tasks for each day
    const getTasksForDay = (day: number) => {
      const date = new Date(year, month, day)
      return tasks.filter((task) => {
        const taskDate = new Date(task.scheduledDate)
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        )
      })
    }

    // Check if a date is today
    const isToday = (day: number) => {
      const today = new Date()
      return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
    }

    // Week day names based on language
    const weekDays = i18n.language === 'ja' ? 
      ["日", "月", "火", "水", "木", "金", "土"] : 
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {monthName} {year}
          </h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center font-medium text-gray-500">
              {day}
            </div>
          ))}

          {blanks.map((blank) => (
            <div key={`blank-${blank}`} className="h-24 border border-gray-100 bg-gray-50 p-1"></div>
          ))}

          {days.map((day) => {
            const dayTasks = getTasksForDay(day)
            return (
              <div
                key={`day-${day}`}
                className={`h-24 overflow-hidden border border-gray-200 p-1 ${
                  isToday(day) ? "bg-[#F0F5FF]" : "bg-white"
                }`}
                onClick={() => onDateClick(new Date(year, month, day))}
              >
                <div className="mb-1 flex justify-between">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                      isToday(day) ? "bg-[#7A3CEF] text-white" : ""
                    }`}
                  >
                    {day}
                  </span>
                  {dayTasks.length > 0 && <Badge className="bg-[#FCE4E6] text-[#FF4D4F]">{dayTasks.length}</Badge>}
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className={`cursor-pointer truncate rounded px-1 py-0.5 text-xs ${getTaskColorClass(task)}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        onTaskClick(task)
                      }}
                    >
                      {task.name}
                    </div>
                  ))}
                  {dayTasks.length > 2 && <div className="text-xs text-gray-500">{i18n.language === 'ja' ? `他${dayTasks.length - 2}件` : `+${dayTasks.length - 2} more`}</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return <div>{renderCalendar()}</div>
}
