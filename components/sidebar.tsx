"use client"

import { useState, useEffect } from "react"
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Home,
  MessageSquare,
  Sparkles,
  Clock,
  LayoutDashboard,
  ListChecks,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"
import { useRouter, usePathname } from "next/navigation"

export default function Sidebar() {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const [userType, setUserType] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setUserType(localStorage.getItem('userType'))
    }
  }, [])

  if (!mounted) return null;

  const handleItemClick = (route: string) => {
    router.push(route)
  }

  const mainMenu = [
    { key: 'interactiveCalendar', icon: <Calendar className="mr-3 h-5 w-5" />, route: '/interactive-calendar' },
    { key: 'fansDatabase', icon: <Users className="mr-3 h-5 w-5" />, route: '/fans-database' },
    { key: 'taskAutomation', icon: <ListChecks className="mr-3 h-5 w-5" />, route: '/task-automation' },
    { key: 'smartContent', icon: <Sparkles className="mr-3 h-5 w-5" />, route: '/smart-content' },
    { key: 'engageHub', icon: <MessageSquare className="mr-3 h-5 w-5" />, route: '/engage-hub' },
    { key: 'dashboard', icon: <LayoutDashboard className="mr-3 h-5 w-5" />, route: '/dashboard' },
  ]
  const workspaceMenu = [
    { key: 'settings', icon: <Settings className="mr-3 h-5 w-5" />, route: '/settings' },
    ...(userType === 'business' ? [{ key: 'teamManagement', icon: <Users className="mr-3 h-5 w-5" />, route: '/team-management' }] : []),
  ]

  return (
    <aside className="h-screen w-64 bg-white rounded-3xl m-4 flex flex-col justify-between">
      <div>
        {/* 主菜单 */}
        <nav className="mt-2">
          <ul className="space-y-1">
            {mainMenu.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleItemClick(item.route)}
                  className={`flex items-center w-full gap-3 px-6 py-3 rounded-xl font-medium transition text-gray-700 hover:bg-[#F5F5F5] ${
                    pathname === item.route ? "bg-[#F5EDFF] text-[#7A3CEF]" : ""
                  }`}
                >
                  {item.icon}
                  <span>{t(item.key)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* 分区标题 */}
        <div className="px-6 pt-6 pb-2 text-xs text-[#7A3CEF] font-semibold tracking-widest">WORKSPACE</div>
        <nav>
          <ul className="space-y-1">
            {workspaceMenu.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleItemClick(item.route)}
                  className={`flex items-center w-full gap-3 px-6 py-3 rounded-xl font-medium transition text-gray-700 hover:bg-[#F5F5F5] ${
                    pathname === item.route ? "bg-[#F5EDFF] text-[#7A3CEF]" : ""
                  }`}
                >
                  {item.icon}
                  <span>{t(item.key)}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
