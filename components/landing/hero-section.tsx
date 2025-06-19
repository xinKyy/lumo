"use client"
import "@/lib/i18n"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0" style={{ backgroundImage: 'url(/image.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-12">
            <img src="/Lumo-logo.png" alt="Lumo Logo White" className="ml-0 mb-4 w-80 h-auto" />
            <p className="text-4xl font-bold text-[#222222]">
              {t('Light Up Fandom, Right On Time.')}
            </p>
            <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("Lumo's smart timing lights up true connections: Effortlessly nurture your fandom with personalized moments, always on time.")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                >
                  {t('Get Started')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 