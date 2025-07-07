"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

interface AccessGuardProps {
  children: React.ReactNode
  disabledForBusiness?: boolean
}

export default function AccessGuard({ children, disabledForBusiness = false }: AccessGuardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [userType, setUserType] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setUserType(localStorage.getItem('userType'))
    }
  }, [])

  if (!mounted) return null

  // 如果是企业账号且该页面被禁用，显示访问被拒绝页面
  if (userType === 'business' && disabledForBusiness) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">访问被拒绝</CardTitle>
            <CardDescription>
              此功能仅对个人创作者账号开放
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">企业账号功能</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    企业账号可以访问团队管理功能，管理多个创作者账号和团队成员。
                  </p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => router.push('/team-management')}
                className="flex-1"
              >
                前往团队管理
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/settings')}
              >
                设置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
} 