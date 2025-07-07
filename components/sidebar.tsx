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
  UserPlus,
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

  // 定义需要为企业账号隐藏的功能
  const hiddenForBusiness = [
    'interactiveCalendar',
    'fansDatabase',
    'taskAutomation',
    'smartContent',
    'engageHub',
    'dashboard'
  ]

  const mainMenu = [
    ...(userType === 'business' ? [{ key: 'creatorDatabase', icon: <UserPlus className="mr-3 h-5 w-5" />, route: '/core/creator-database' }] : []),
    { key: 'interactiveCalendar', icon: <Calendar className="mr-3 h-5 w-5" />, route: '/core/interactive-calendar' },
    { key: 'fansDatabase', icon: <Users className="mr-3 h-5 w-5" />, route: '/core/fans-database' },
    { key: 'taskAutomation', icon: <ListChecks className="mr-3 h-5 w-5" />, route: '/core/task-automation' },
    { key: 'smartContent', icon: <Sparkles className="mr-3 h-5 w-5" />, route: '/core/smart-content' },
    { key: 'engageHub', icon: <MessageSquare className="mr-3 h-5 w-5" />, route: '/core/engage-hub' },
    { key: 'dashboard', icon: <LayoutDashboard className="mr-3 h-5 w-5" />, route: '/core/dashboard' },
  ]

  const workspaceMenu = [
    { key: 'settings', icon: <Settings className="mr-3 h-5 w-5" />, route: '/core/settings' },
    ...(userType === 'business' ? [
      { key: 'teamManagement', icon: <Users className="mr-3 h-5 w-5" />, route: '/core/team-management' }
    ] : []),
  ]

  // 过滤掉企业账号需要隐藏的菜单项
  const filteredMainMenu = mainMenu.filter(item =>
    userType !== 'business' || !hiddenForBusiness.includes(item.key)
  )

  return (
    <aside className="h-screen w-64 bg-white rounded-3xl m-4 flex flex-col justify-between">
      <div>
        {/* 主菜单 */}
        <nav className="mt-2">
          <ul className="space-y-1">
            {filteredMainMenu.map((item) => (
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
