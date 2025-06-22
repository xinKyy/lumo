"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useState, useEffect, useRef } from "react"

export default function LandingHeader() {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState('en')
  const [langOpen, setLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  
  const langOptions = [
    { value: 'en', label: 'EN', icon: '/language/gb.svg' },
    { value: 'ja', label: '日本語', icon: '/language/jp.svg' },
  ]

  // 在客户端挂载后设置正确的语言
  useEffect(() => {
    setMounted(true)
    setLang(i18n.language || 'en')
  }, [i18n.language])

  // 点击外部区域关闭语言选择器
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }

    if (langOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langOpen])

  const handleLangChange = (lng: string) => {
    console.log('Language change clicked:', lng)
    setLang(lng)
    i18n.changeLanguage(lng)
    setLangOpen(false)
  }

  const handleLangToggle = () => {
    console.log('Language toggle clicked, current state:', langOpen)
    setLangOpen((v) => !v)
  }

  // 简化版本的语言切换按钮
  const LanguageToggle = () => (
    <div className="relative z-50" ref={langDropdownRef}>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        onClick={handleLangToggle}
        type="button"
      >
        <Image 
          src={mounted ? (langOptions.find(l => l.value === lang)?.icon || '/language/gb.svg') : '/language/gb.svg'} 
          alt="flag" 
          width={20} 
          height={20} 
          className="rounded-full" 
        />
        <span className="font-medium text-sm text-gray-700">
          {mounted ? (langOptions.find(l => l.value === lang)?.label || 'EN') : 'EN'}
        </span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {langOpen && mounted && (
        <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-200 rounded-lg shadow-lg">
          {langOptions.map(option => (
            <button
              key={option.value}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition ${
                lang === option.value ? 'font-bold text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => handleLangChange(option.value)}
            >
              <Image src={option.icon} alt={option.label} width={18} height={18} className="rounded-full" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/Lumo-logo.png"
                alt="Lumo Logo"
                width={100}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="#highlights" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t("Features")}
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t("Highlights")}
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t("Testimonials")}
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {t("Pricing")}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* 语言切换按钮 */}
            <LanguageToggle />
            
            <Link href="/auth/login">
              <Button variant="ghost" className="text-sm">
                {t("Log in")}
              </Button>
            </Link>
            
            <Link href="/auth/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                {t("Get Started")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 