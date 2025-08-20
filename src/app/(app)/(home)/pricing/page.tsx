"use client";

import { CheckCircle, X, Star, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started",
    popular: false,
    features: [
      { name: "Up to 5 team members", included: true },
      { name: "10GB storage", included: true },
      { name: "Basic analytics", included: true },
      { name: "Email support", included: true },
      { name: "API access", included: false },
      { name: "Advanced security", included: false },
      { name: "Custom integrations", included: false },
      { name: "Priority support", included: false }
    ],
    cta: "Start Free Trial",
    variant: "outline" as const
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for growing businesses and teams",
    popular: true,
    features: [
      { name: "Up to 25 team members", included: true },
      { name: "100GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority email support", included: true },
      { name: "API access", included: true },
      { name: "Advanced security", included: true },
      { name: "Custom integrations", included: false },
      { name: "24/7 phone support", included: false }
    ],
    cta: "Get Started",
    variant: "elevated" as const
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations with advanced needs",
    popular: false,
    features: [
      { name: "Unlimited team members", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Custom analytics", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Full API access", included: true },
      { name: "Enterprise security", included: true },
      { name: "Custom integrations", included: true },
      { name: "24/7 phone support", included: true }
    ],
    cta: "Contact Sales",
    variant: "outline" as const
  }
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with global CDN"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration tools"
  }
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through Stripe."
  },
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges or credits to your account."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial for all plans. No credit card required to start your trial. You can explore all features and decide which plan works best for you."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can either upgrade your plan or we'll work with you to find the best solution for your needs."
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! Save 20% when you choose annual billing. This discount is automatically applied when you select the annual billing option during checkout."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
  }
];

const testimonials = [
  {
    quote: "The Professional plan has been perfect for our growing team. The advanced analytics have helped us make better decisions.",
    author: "Sarah Johnson",
    role: "Product Manager",
    company: "TechStart Inc."
  },
  {
    quote: "Enterprise features and support are outstanding. The dedicated account manager has been incredibly helpful.",
    author: "Michael Chen",
    role: "CTO",
    company: "Global Solutions"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit mx-auto">
              <Star className="w-3 h-3 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              Choose the Perfect Plan for
              <span className="text-primary"> Your Team</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default" className="px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    variant={plan.variant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Features Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Every Plan Includes
            </h2>
            <p className="text-xl text-muted-foreground">
              Core features available across all pricing tiers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300">
                <CardContent className="space-y-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start your free trial today and see why thousands of teams choose our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="elevated" className="px-8 group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}