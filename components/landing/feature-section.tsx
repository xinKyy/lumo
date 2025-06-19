"use client"
import "@/lib/i18n"
import Image from "next/image"
import { ArrowRight, BarChart3, MessageSquare, Users, UserCheck, Sparkles, Send, MonitorSmartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function FeatureSection() {
  const { t } = useTranslation()
  const features = [
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: t("Precise Fan Profiles"),
      description: t("Auto-generate 360° fan dossiers: Track interests, milestones, and past interactions to personalize every touchpoint."),
      image: "/highlight1.png",
      imageAlt: t("Fan profile dashboard showing 360° dossiers"),
      reverse: false,
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: t("Personalize at Scale"),
      description: t("Launch authentic 1:1 conversations effortlessly — smart templates adapt to fan context, in your unique tone."),
      image: "/highlight2.png",
      imageAlt: t("Smart template personalization"),
      reverse: true,
    },
    {
      icon: <Send className="h-10 w-10 text-primary" />,
      title: t("One-Click Task Mastery"),
      description: t("Execute weeks of engagement in minutes: Batch-schedule comments, DMs, and gifts across timezones, prioritized by ROI."),
      image: "/highlight3.png",
      imageAlt: t("Batch scheduling and automation"),
      reverse: false,
    },
    {
      icon: <MonitorSmartphone className="h-10 w-10 text-primary" />,
      title: t("Cross-Platform Command"),
      description: t("Centralize all fan touchpoints: Monitor, reply, and analyze Instagram + TikTok + YouTube from one cockpit."),
      image: "/highlight4.png",
      imageAlt: t("Cross-platform command center"),
      reverse: true,
    },
  ]

  return (
    <section id="features" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('Key')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('Highlights')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            {t('Explore the comprehensive tools that help you manage and grow your fan relationships')}
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col gap-8 items-center ${feature.reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              <div className="flex-1 space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-base text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex-1 overflow-hidden rounded-lg h-[280px] relative bg-background/60 backdrop-blur">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.imageAlt}
                  fill
                  style={{ objectFit: "contain" }}
                  className="w-full h-full"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 