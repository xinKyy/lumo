"use client"
import "@/lib/i18n"
import { Calendar, Database, Sparkles, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export default function HighlightsSection() {
  const { t } = useTranslation()
  const highlights = [
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: t("Interactive Calendar"),
      description: t("Manage all your fan interactions and content schedules in one intuitive calendar interface."),
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: t("Fan Database"),
      description: t("Automatically sync and organize fan data across all your social platforms for deeper insights."),
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: t("Smart Content"),
      description: t("AI-powered content templates that help you create engaging posts tailored to your audience."),
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t("Task Automation"),
      description: t("Automate routine fan engagement tasks and focus on creating meaningful connections."),
    },
  ]

  return (
    <section id="highlights" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('Powerful')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('Features')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            {t('Discover what makes Lumo the ultimate platform for creators')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="border-2 border-muted bg-background/60 backdrop-blur transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2">{highlight.icon}</div>
                <CardTitle className="text-xl">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{highlight.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 