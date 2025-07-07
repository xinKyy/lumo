"use client"
import "@/lib/i18n"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Building2, Check, Instagram, TwitterIcon as TikTok, User, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"

export default function RegisterPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") === "business" ? "business" : "personal"
  const [userType, setUserType] = useState<"personal" | "business">(initialType)
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userType', userType)
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(Math.max(1, step - 1))
  }

  const handleCompleteRegistration = () => {
    // 根据账号类型跳转到不同页面
    if (userType === 'business') {
      router.push("/team-management")
    } else {
      router.push("/interactive-calendar")
    }
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-10">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-muted-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('Back to home')}
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t('Create your Lumo account')}</h1>
          <p className="text-sm text-muted-foreground">{t('Choose your account type to get started')}</p>
        </div>

        {step === 1 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Select Account Type')}</CardTitle>
              <CardDescription>{t('Choose the type of account that best fits your needs')}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                defaultValue={userType}
                onValueChange={(value) => setUserType(value as "personal" | "business")}
              >
                <div
                  className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => setUserType("personal")}
                >
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="flex flex-1 items-center gap-3 font-normal cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{t('Personal Account')}</div>
                      <div className="text-sm text-muted-foreground">{t('For individual creators and influencers')}</div>
                    </div>
                  </Label>
                </div>
                <div
                  className="mt-3 flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => setUserType("business")}
                >
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="flex flex-1 items-center gap-3 font-normal cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{t('Business Account')}</div>
                      <div className="text-sm text-muted-foreground">{t('For agencies, teams, and large creators')}</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleNext}
              >
                {t('Continue')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && userType === "personal" && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Personal Account Details')}</CardTitle>
              <CardDescription>{t('Enter your information to create your creator account')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{t('First name')}</Label>
                  <Input id="first-name" placeholder={t('John')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{t('Last name')}</Label>
                  <Input id="last-name" placeholder={t('Doe')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email')}</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('Password')}</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('Phone (optional)')}</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <Separator />
              <div>
                <Label className="text-base">{t('Social Media Accounts (optional)')}</Label>
                <p className="text-sm text-muted-foreground mb-4">{t('Connect your accounts to import your fan data')}</p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Instagram className="mr-2 h-4 w-4" />
                    {t('Connect Instagram')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TikTok className="mr-2 h-4 w-4" />
                    {t('Connect TikTok')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Youtube className="mr-2 h-4 w-4" />
                    {t('Connect YouTube')}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleNext}
              >
                {t('Create Account')}
              </Button>
              <Button variant="ghost" onClick={handleBack}>
                {t('Back')}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && userType === "business" && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Business Account Details')}</CardTitle>
              <CardDescription>{t('Enter your business information')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">{t('Company/Agency Name')}</Label>
                <Input id="company-name" placeholder={t('Lumo Agency')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-email">{t('Business Email')}</Label>
                <Input id="business-email" type="email" placeholder="contact@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-password">{t('Password')}</Label>
                <Input id="business-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">{t('Industry')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select industry')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entertainment">{t('Entertainment')}</SelectItem>
                    <SelectItem value="fashion">{t('Fashion & Beauty')}</SelectItem>
                    <SelectItem value="gaming">{t('Gaming')}</SelectItem>
                    <SelectItem value="technology">{t('Technology')}</SelectItem>
                    <SelectItem value="health">{t('Health & Fitness')}</SelectItem>
                    <SelectItem value="other">{t('Other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-size">{t('Company Size')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select company size')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">{t('1-10 employees')}</SelectItem>
                    <SelectItem value="11-50">{t('11-50 employees')}</SelectItem>
                    <SelectItem value="51-200">{t('51-200 employees')}</SelectItem>
                    <SelectItem value="201+">{t('201+ employees')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('Business Phone')}</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleNext}
              >
                {t('Continue')}
              </Button>
              <Button variant="ghost" onClick={handleBack}>
                {t('Back')}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && userType === "business" && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Team Setup')}</CardTitle>
              <CardDescription>{t('Invite team members and set up your organization')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('Team Members (Optional)')}</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('Add team members who will access your Lumo account')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="colleague@company.com" />
                    <Select defaultValue="member">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">{t('Admin')}</SelectItem>
                        <SelectItem value="member">{t('Member')}</SelectItem>
                        <SelectItem value="viewer">{t('Viewer')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full">
                    {t('+ Add Another Team Member')}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>{t('Creator Accounts')}</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('Connect the social media accounts you manage')}
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Instagram className="mr-2 h-4 w-4" />
                    {t('Connect Instagram Accounts')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TikTok className="mr-2 h-4 w-4" />
                    {t('Connect TikTok Accounts')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Youtube className="mr-2 h-4 w-4" />
                    {t('Connect YouTube Accounts')}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                {t('Create Business Account')}
              </Button>
              <Button variant="ghost" onClick={handleBack}>
                {t('Back')}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && userType === "personal" && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Account Created!')}</CardTitle>
              <CardDescription>{t('Your personal creator account has been set up successfully')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">{t('Welcome to Lumo!')}</h3>
                <p className="text-muted-foreground">
                  {t('You\'re all set to start managing your fan interactions and growing your audience.')}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleCompleteRegistration}
              >
                {t('Go to Lumo')}
              </Button>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  {t('Return to Home')}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {step === 4 && userType === "business" && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{t('Account Created!')}</CardTitle>
              <CardDescription>{t('Your business account has been set up successfully')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">{t('Welcome to Lumo!')}</h3>
                <p className="text-muted-foreground">
                  {t('Your business account is ready. You can now manage multiple creator accounts and collaborate with your team.')}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                onClick={handleCompleteRegistration}
              >
                {t('Go to Business Dashboard')}
              </Button>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  {t('Return to Home')}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {step === 1 && (
          <div className="text-center text-sm">
            {t('Already have an account?')}
            <Link href="/auth/login" className="text-primary hover:underline">
              {t('Sign in')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
} 