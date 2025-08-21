"use client";

import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  Rocket,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Experience blazing fast load times and seamless interactions with our optimized infrastructure.",
    benefits: [
      "99.9% uptime guarantee",
      "Sub-second response times",
      "Global CDN network",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Bank-level security with end-to-end encryption and advanced threat protection.",
    benefits: [
      "256-bit SSL encryption",
      "SOC 2 Type II compliant",
      "Regular security audits",
    ],
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description:
      "Get up and running in minutes with our streamlined onboarding process.",
    benefits: [
      "One-click setup",
      "Pre-built templates",
      "Migration assistance",
    ],
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with real-time collaboration tools and shared workspaces.",
    benefits: [
      "Real-time editing",
      "Role-based permissions",
      "Activity tracking",
    ],
  },
];

const pricingFeatures = [
  "Unlimited projects",
  "Advanced analytics",
  "Priority support",
  "Custom integrations",
  "White-label options",
  "API access",
];

const faqs = [
  {
    question: "How quickly can I get started?",
    answer:
      "You can be up and running in under 5 minutes. Our streamlined onboarding process guides you through account setup, and you'll have access to all features immediately.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use bank-level 256-bit SSL encryption, maintain SOC 2 Type II compliance, and conduct regular security audits to ensure your data is always protected.",
  },
  {
    question: "Can I integrate with existing tools?",
    answer:
      "Yes! We offer extensive API access and pre-built integrations with popular tools. Our team can also help with custom integrations for enterprise clients.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide 24/7 priority support for all users, including live chat, email support, and dedicated account managers for enterprise clients.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Star className="w-3 h-3 mr-1" />
                  New Features Available
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Powerful Features for
                  <span className="text-primary"> Modern Teams</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover the tools and capabilities that make our platform the
                  perfect choice for teams who want to build, scale, and succeed
                  together.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="elevated" className="group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1644460187708-5e04f6b5ae75?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjB0ZWNobm9sb2d5JTIwbW9kZXJuJTIwY2xlYW58ZW58MHwwfHxibHVlfDE3NTU3MjQ4OTl8MA&ixlib=rb-4.1.0&q=85"
                  alt="Modern technology dashboard interface by yang shang on Unsplash"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive feature set is designed to help teams of all
              sizes achieve their goals faster and more efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={`feature-${index}`}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={`feature-benefit-${benefitIndex}`}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Tabbed Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Explore Our Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive deeper into the features that make our platform stand out
              from the competition.
            </p>
          </div>

          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="outline">Advanced Analytics</Badge>
                  <h3 className="text-3xl font-bold text-foreground">
                    Data-Driven Insights
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Make informed decisions with comprehensive analytics and
                    reporting tools. Track performance, identify trends, and
                    optimize your workflows with real-time data visualization.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Real-time dashboards",
                      "Custom reports",
                      "Performance metrics",
                      "Trend analysis",
                    ].map((item, index) => (
                      <li
                        key={`feature-analytics-${index}`}
                        className="flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mr-3" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="elevated" size="lg">
                    Explore Analytics
                  </Button>
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1587401511935-a7f87afadf2f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxhbmFseXRpY3MlMjBjaGFydHMlMjBncmFwaHMlMjBkYXRhJTIwYnVzaW5lc3N8ZW58MHwwfHxibHVlfDE3NTU3MjQ4OTl8MA&ixlib=rb-4.1.0&q=85"
                    alt="Business analytics charts and graphs by KOBU Agency on Unsplash"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="outline">Smart Automation</Badge>
                  <h3 className="text-3xl font-bold text-foreground">
                    Streamline Your Workflow
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Automate repetitive tasks and focus on what matters most.
                    Our intelligent automation tools help you save time and
                    reduce errors while maintaining quality.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Workflow automation",
                      "Smart triggers",
                      "Batch processing",
                      "Error handling",
                    ].map((item, index) => (
                      <li
                        key={`feature-automation-${index}`}
                        className="flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mr-3" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="elevated" size="lg">
                    Learn More
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Rocket className="w-16 h-16 text-primary mx-auto" />
                    <h4 className="text-xl font-semibold">Automation Ready</h4>
                    <p className="text-muted-foreground">
                      Set up automated workflows in minutes
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="outline">Seamless Integration</Badge>
                  <h3 className="text-3xl font-bold text-foreground">
                    Connect Everything
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Integrate with your favorite tools and services. Our
                    extensive API and pre-built connectors make it easy to
                    create a unified workflow across all your platforms.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "REST API access",
                      "Webhook support",
                      "Pre-built connectors",
                      "Custom integrations",
                    ].map((item, index) => (
                      <li
                        key={`feature-integration-${index}`}
                        className="flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mr-3" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="elevated" size="lg">
                    View Integrations
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Users className="w-16 h-16 text-primary mx-auto" />
                    <h4 className="text-xl font-semibold">100+ Integrations</h4>
                    <p className="text-muted-foreground">
                      Connect with tools you already use
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Pricing Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Everything Included
            </h2>
            <p className="text-xl text-muted-foreground">
              No hidden fees, no feature limitations. Get access to everything
              you need to succeed.
            </p>
          </div>

          <Card className="p-8">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Complete Feature Set</CardTitle>
              <CardDescription className="text-lg">
                All features included in every plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {pricingFeatures.map((feature, index) => (
                  <div
                    key={`pricing-feature-${index}`}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" variant="elevated" className="px-8">
                  Start Free Trial
                </Button>
              </div>
            </CardContent>
          </Card>
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
              Get answers to common questions about our features and
              capabilities.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-item-${index}`}
                className="border rounded-lg px-6"
              >
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
                Join thousands of teams who are already using our platform to
                build amazing products and grow their businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="elevated" className="px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
