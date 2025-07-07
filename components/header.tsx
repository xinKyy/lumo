"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu"
import { LogOut, Users, PlusCircle, Check, ChevronDown, Instagram, Twitter } from "lucide-react"
import { SiOnlyfans } from "react-icons/si"
import NotificationDrawer from "@/components/notifications/notification-drawer"
import { sampleNotifications } from "@/components/notifications/notification-data"
import type { Notification } from "@/components/notifications/notification-drawer"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

// Mock platform accounts data
const platformAccounts = [
  {
    id: "ins1",
    platform: "Instagram",
    handle: "@fashion_style",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    followers: "125.6K",
    isActive: true
  },
  {
    id: "ins2",
    platform: "Instagram",
    handle: "@travel_diary",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    followers: "89.2K",
    isActive: false
  },
  {
    id: "x1",
    platform: "X",
    handle: "@tech_news",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    followers: "45.8K",
    isActive: false
  },
  {
    id: "of1",
    platform: "OnlyFans",
    handle: "@creative_arts",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    followers: "12.3K",
    isActive: false
  },
  {
    id: "of2",
    platform: "OnlyFans",
    handle: "@digital_creator",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    followers: "8.9K",
    isActive: false
  }
]



// Mock accounts data
const mockAccounts = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true
  },
  {
    id: "2",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isActive: false
  },
  {
    id: "3",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    isActive: false
  }
]

export default function Header() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(mockAccounts[0])
  const [currentPlatform, setCurrentPlatform] = useState(platformAccounts[0])
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [userType, setUserType] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // 语言切换相关
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState('en') // 默认使用英语，避免hydration错误
  const [langOpen, setLangOpen] = useState(false)
  
  const langOptions = [
    { value: 'en', label: 'EN', icon: '/language/gb.svg' },
    { value: 'ja', label: '日本語', icon: '/language/jp.svg' },
  ]

  // 在客户端挂载后设置正确的语言和用户类型
  useEffect(() => {
    setMounted(true)
    setLang(i18n.language || 'en')
    if (typeof window !== 'undefined') {
      setUserType(localStorage.getItem('userType'))
    }
  }, [i18n.language])

  const handleLangChange = (lng: string) => {
    setLang(lng)
    i18n.changeLanguage(lng)
    setLangOpen(false)
  }

  const handleNotificationsChange = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications)
  }

  const handleSwitchAccount = (account: typeof mockAccounts[0]) => {
    setCurrentUser(account)
  }

  const handleSwitchPlatform = (platform: typeof platformAccounts[0]) => {
    setCurrentPlatform(platform)
  }

  const handleAddAccount = () => {
    router.push('/auth/login')
  }

  const handleAddPlatformAccount = () => {
    // 处理绑定新平台账号的逻辑
    console.log("Add new platform account clicked")
  }

  const handleLogout = () => {
    // 清除用户登录状态
    // 这里可以添加清除localStorage、cookies等逻辑
    console.log("Logout clicked")
    
    // 跳转到登录页面
    router.push('/auth/login')
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "X":
        return <Twitter className="h-4 w-4" />
      case "OnlyFans":
        return <SiOnlyfans className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }



  if (!mounted) return null

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center space-x-6">
        <img src="/Lumo-logo.png" alt="Lumo Logo" className="h-8 w-auto" />
        {/* 只有个人用户才显示平台账号切换按钮 */}
        {userType === 'personal' && (
          <>
            <div className="h-8 w-px bg-gray-200"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-200/50 hover:border-gray-300/50 shadow-sm hover:shadow-md">
                  <Avatar className="h-7 w-7 ring-2 ring-white">
                    <AvatarImage src={currentPlatform.avatar} alt={currentPlatform.handle} />
                    <AvatarFallback className="text-xs font-medium">{currentPlatform.handle[1]}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <div className="mr-3">
                      <div className="flex items-center">
                        {getPlatformIcon(currentPlatform.platform)}
                        <span className="ml-2 text-sm font-semibold text-gray-800">{currentPlatform.handle}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{currentPlatform.followers} {t("followers")}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 p-2">
                <div className="px-2 py-1.5">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("platformAccounts")}</h3>
                </div>
                {platformAccounts.map((account) => (
                  <DropdownMenuItem
                    key={account.id}
                    onClick={() => handleSwitchPlatform(account)}
                    className="cursor-pointer rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center w-full">
                      <Avatar className="h-10 w-10 mr-3 ring-2 ring-gray-100">
                        <AvatarImage src={account.avatar} alt={account.handle} />
                        <AvatarFallback className="text-sm font-medium">{account.handle[1]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {getPlatformIcon(account.platform)}
                          <span className="ml-2 text-sm font-semibold text-gray-800">{account.handle}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{account.followers} {t("followers")}</p>
                      </div>
                      {account.isActive && (
                        <div className="flex items-center justify-center h-5 w-5 rounded-full bg-[#7A3CEF]">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  onClick={handleAddPlatformAccount} 
                  className="cursor-pointer rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center w-full">
                    <div className="flex items-center justify-center h-10 w-10 mr-3 rounded-full bg-gradient-to-br from-purple-100 to-gray-200">
                      <PlusCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-800">{t("addNewAccount")}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{t("connectNewPlatform")}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      <div className="flex items-center space-x-6">
        {/* 语言切换按钮 */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-1.5 bg-white/90 border border-primary/30 rounded-full shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition min-w-[120px]"
            onClick={() => setLangOpen((v) => !v)}
            type="button"
          >
            <Image 
              src={mounted ? (langOptions.find(l => l.value === lang)?.icon || '/language/gb.svg') : '/language/gb.svg'} 
              alt="flag" 
              width={22} 
              height={22} 
              className="rounded-full" 
            />
            <span className="font-medium text-sm">
              {mounted ? (langOptions.find(l => l.value === lang)?.label || 'EN') : 'EN'}
            </span>
            <svg className="ml-1 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {langOpen && mounted && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-primary/20 rounded-xl shadow-lg z-50">
              {langOptions.map(option => (
                <button
                  key={option.value}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-primary/10 transition ${lang === option.value ? 'font-bold text-primary' : ''}`}
                  onClick={() => handleLangChange(option.value)}
                >
                  <Image src={option.icon} alt={option.label} width={20} height={20} className="rounded-full" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 消息通知icon */}
        <NotificationDrawer notifications={notifications} onNotificationsChange={handleNotificationsChange} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <Users className="mr-2 h-4 w-4" />
                {t("switchAccount")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-56">
                  {mockAccounts.map((account) => (
                    <DropdownMenuItem
                      key={account.id}
                      onClick={() => handleSwitchAccount(account)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center w-full">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={account.avatar} alt={account.name} />
                          <AvatarFallback>{account.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-gray-500">{account.email}</p>
                        </div>
                        {account.isActive && <Check className="h-4 w-4 text-[#7A3CEF]" />}
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleAddAccount} className="cursor-pointer">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t("addAccount")}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
