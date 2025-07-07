"use client"
import "@/lib/i18n"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Instagram, Mail, TwitterIcon as TikTok } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "react-i18next"

export default function LoginPage() {
  const { t } = useTranslation()
  const [userType, setUserType] = useState<"personal" | "business">("personal")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessPassword, setBusinessPassword] = useState("")
  const router = useRouter()

  // 登录逻辑：任意账号密码都能登录
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.setItem('userType', userType)
    }
    // 根据账号类型跳转到不同页面
    if (userType === 'business') {
      router.push("/core/creator-database")
    } else {
      router.push("/core/interactive-calendar")
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-muted-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('Back to home')}
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t('Welcome back to Lumo')}</h1>
          <p className="text-sm text-muted-foreground">{t('Sign in to your account to continue')}</p>
        </div>
        <Tabs
          defaultValue="personal"
          className="w-full"
          onValueChange={(value) => setUserType(value as "personal" | "business")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">{t('Personal')}</TabsTrigger>
            <TabsTrigger value="business">{t('Business')}</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <form onSubmit={handleLogin}>
              <Card>
                <CardHeader>
                  <CardTitle>{t('Personal Account')}</CardTitle>
                  <CardDescription>{t('Sign in to your creator account')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('Email')}</Label>
                    <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t('Password')}</Label>
                      <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                        {t('Forgot password?')}
                      </Link>
                    </div>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    {t('Sign In')}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t('Or continue with')}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <TikTok className="h-4 w-4" />
                      TikTok
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    {t("Don't have an account? Register")}
                    <Link href="/auth/register" className="text-primary hover:underline">
                      {t('Sign up')}
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="business">
            <form onSubmit={handleLogin}>
              <Card>
                <CardHeader>
                  <CardTitle>{t('Business Account')}</CardTitle>
                  <CardDescription>{t('Sign in to your business or agency account')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-email">{t('Business Email')}</Label>
                    <Input id="business-email" type="email" placeholder="company@example.com" value={businessEmail} onChange={e => setBusinessEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="business-password">{t('Password')}</Label>
                      <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                        {t('Forgot password?')}
                      </Link>
                    </div>
                    <Input id="business-password" type="password" value={businessPassword} onChange={e => setBusinessPassword(e.target.value)} />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    {t('Sign In')}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t('Or continue with')}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('SSO Login')}
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-center text-sm">
                    {t("Don't have a business account? Register")}
                    <Link href="/auth/register?type=business" className="text-primary hover:underline">
                      {t('Sign up')}
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
