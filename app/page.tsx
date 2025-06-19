import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/landing/hero-section"
import HighlightsSection from "@/components/landing/highlights-section"
import FeatureSection from "@/components/landing/feature-section"
import TestimonialSection from "@/components/landing/testimonial-section"
import PricingSection from "@/components/landing/pricing-section"
import StatsSection from "@/components/landing/stats-section"
import Footer from "@/components/landing/footer"
import LandingHeader from "@/components/landing/landing-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <HeroSection />
      <HighlightsSection />
      <FeatureSection />
      <TestimonialSection />
      <PricingSection />
      <StatsSection />
      <Footer />
    </div>
  )
}
