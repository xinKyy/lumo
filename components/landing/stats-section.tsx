"use client"
import "@/lib/i18n"
import { useTranslation } from "react-i18next"

export default function StatsSection() {
  const { t } = useTranslation()
  const stats = [
    { value: "10M+", label: t("Fan Interactions Managed") },
    { value: "5,000+", label: t("Active Creators") },
    { value: "98%", label: t("Customer Satisfaction") },
    { value: "30%", label: t("Average Engagement Increase") },
  ]

  return (
    <section className="py-12 bg-gradient-to-r from-primary to-secondary">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-white/80 md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 