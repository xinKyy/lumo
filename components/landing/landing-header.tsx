"use client"
import "@/lib/i18n"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

export default function LandingHeader() {
  const { t, i18n, ready } = useTranslation()
  const [lang, setLang] = useState('en')
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (ready && i18n.language) {
      setLang(i18n.language)
    }
  }, [ready, i18n.language])

  const handleChange = (lng: string) => {
    setLang(lng)
    i18n.changeLanguage(lng)
    setOpen(false)
  }

  const langOptions = [
    { value: 'en', label: 'EN', icon: '/language/gb.svg' },
    { value: 'ja', label: '日本語', icon: '/language/jp.svg' },
  ]

  // 如果组件还没有挂载，显示加载状态
  if (!mounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200 shadow-lg">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  console.log('LandingHeader rendering with lang:', lang, 'ready:', ready)

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="container">
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
                {ready ? t('Features') : 'Features'}
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {ready ? t('Highlights') : 'Highlights'}
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {ready ? t('Testimonials') : 'Testimonials'}
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                {ready ? t('Pricing') : 'Pricing'}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 border border-gray-200/70 rounded-full text-sm font-medium text-gray-700 hover:bg-white/90 hover:border-gray-300/70 transition-all duration-200"
                onClick={() => setOpen(!open)}
              >
                <Image 
                  src={langOptions.find(l => l.value === lang)?.icon || '/language/gb.svg'} 
                  alt="flag" 
                  width={18} 
                  height={18} 
                  className="rounded-full"
                />
                <span>{langOptions.find(l => l.value === lang)?.label}</span>
                <svg className="w-4 h-4 text-gray-500 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg ring-1 ring-black/5 z-50 border border-gray-100/50">
                  <div className="py-1">
                    {langOptions.map(option => (
                      <button
                        key={option.value}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-white/80 transition-all duration-150"
                        onClick={() => handleChange(option.value)}
                      >
                        <Image 
                          src={option.icon} 
                          alt={option.label} 
                          width={20} 
                          height={20} 
                          className="rounded-full"
                        />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/auth/login">
              <Button variant="ghost" className="text-sm hover:bg-white/60">
                {ready ? t('Log in') : 'Log in'}
              </Button>
            </Link>
            
            <Link href="/auth/register">
              <Button className="bg-purple-600/90 hover:bg-purple-700/90 text-white backdrop-blur-sm">
                {ready ? t('Get Started') : 'Get Started'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 