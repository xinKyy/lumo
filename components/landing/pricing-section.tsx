"use client"
import "@/lib/i18n"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export default function PricingSection() {
  const { t } = useTranslation()
  const plans = [
    {
      name: t("Starter"),
      price: "$29",
      description: t("Perfect for individual creators just getting started"),
      features: [
        t("Interactive Calendar"),
        t("Basic Fan Database"),
        t("5 Social Media Accounts"),
        t("Basic Analytics"),
        t("Email Support"),
      ],
      popular: false,
    },
    {
      name: t("Professional"),
      price: "$79",
      description: t("For growing creators who need more advanced tools"),
      features: [
        t("Everything in Starter"),
        t("Advanced Fan Analytics"),
        t("AI Content Suggestions"),
        t("15 Social Media Accounts"),
        t("Priority Support"),
        t("Team Collaboration (2 members)"),
      ],
      popular: true,
    },
    {
      name: t("Business"),
      price: "$199",
      description: t("For agencies and established creators with large audiences"),
      features: [
        t("Everything in Professional"),
        t("Unlimited Social Media Accounts"),
        t("Advanced Team Management"),
        t("Custom Branding"),
        t("API Access"),
        t("Dedicated Account Manager"),
        t("Custom Integrations"),
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('Simple,')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('Transparent Pricing')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            {t('Choose the plan that works best for your needs')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 ${
                plan.popular
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "border-muted bg-background/60 backdrop-blur hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-white">
                  {t('Most Popular')}
                </div>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <CardDescription className="pt-1.5">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {t('Get Started')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 