"use client"
import "@/lib/i18n"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function TestimonialSection() {
  const { t } = useTranslation()
  const testimonials = [
    {
      quote:
        "Lumo has completely transformed how I engage with my audience. The AI content suggestions are spot on!",
      author: "Alex Chen",
      role: "Content Creator, 500K+ followers",
      rating: 5,
      avatar: "/avatar-alex.jpg",
    },
    {
      quote:
        "Managing multiple social accounts used to be a nightmare. With Lumo, I can see everything in one place.",
      author: "Sarah Johnson",
      role: "Fashion Influencer",
      rating: 5,
      avatar: "/avatar-sarah.jpg",
    },
    {
      quote: "The fan analytics have helped us understand our audience better than ever before. Worth every penny.",
      author: "Michael Rodriguez",
      role: "Gaming Channel, 1.2M subscribers",
      rating: 4,
      avatar: "/avatar-michael.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('Loved by')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('Creators Worldwide')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
            {t('See what our users are saying about their experience with Lumo')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 border-muted bg-background/60 backdrop-blur transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-lg italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center border-t pt-4">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-10 w-10 rounded-full object-cover border border-muted"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div className="ml-4">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 