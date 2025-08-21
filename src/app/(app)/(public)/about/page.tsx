"use client";

import Image from "next/image";
import { Users, Target, Heart, Zap, CheckCircle, ArrowRight, Linkedin, Twitter, Github } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const milestones = [
  { year: "2020", title: "Company Founded", description: "Started with a vision to revolutionize digital commerce", progress: 100 },
  { year: "2021", title: "First 1000 Users", description: "Reached our first major milestone with growing user base", progress: 100 },
  { year: "2022", title: "Series A Funding", description: "Secured $10M in Series A to accelerate growth", progress: 100 },
  { year: "2023", title: "Global Expansion", description: "Expanded operations to 15+ countries worldwide", progress: 100 },
  { year: "2024", title: "AI Integration", description: "Launched AI-powered features for enhanced user experience", progress: 75 }
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to empowering businesses with cutting-edge technology solutions that drive real results."
  },
  {
    icon: Heart,
    title: "Customer-Centric",
    description: "Every decision we make is guided by our commitment to delivering exceptional value to our customers."
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "We continuously push boundaries and embrace new technologies to stay ahead of the curve."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "We believe in the power of diverse perspectives and collaborative problem-solving."
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at TechCorp with 15+ years in scaling technology companies.",
    avatar: "https://i.pravatar.cc/150?img=1",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer passionate about building scalable systems and AI-driven solutions.",
    avatar: "https://i.pravatar.cc/150?img=3",
    social: { linkedin: "#", github: "#" }
  },
  {
    name: "Emily Watson",
    role: "Head of Design",
    bio: "Award-winning designer with expertise in user experience and product design.",
    avatar: "https://i.pravatar.cc/150?img=5",
    social: { linkedin: "#", twitter: "#" }
  },
  {
    name: "David Kim",
    role: "VP of Sales",
    bio: "Sales leader with proven track record of building high-performing revenue teams.",
    avatar: "https://i.pravatar.cc/150?img=7",
    social: { linkedin: "#" }
  }
];

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "99.9%", label: "Uptime" },
  { number: "15+", label: "Countries" },
  { number: "24/7", label: "Support" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Heart className="w-3 h-3 mr-1" />
                  Our Story
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Building the Future of
                  <span className="text-primary"> Digital Commerce</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We're a passionate team of innovators, designers, and engineers dedicated to creating technology that empowers businesses to thrive in the digital age.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="elevated" className="group">
                  Join Our Team
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Our Mission
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHx0ZWFtJTIwb2ZmaWNlJTIwcHJvZmVzc2lvbmFsJTIwZGl2ZXJzZSUyMGNvbGxhYm9yYXRpb258ZW58MHwwfHx8MTc1NTcyNjYzNHww&ixlib=rb-4.1.0&q=85"
                  alt="Professional team photo by Mapbox on Unsplash"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Company Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From a small startup to a global platform serving thousands of businesses worldwide.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="lg:w-24 flex-shrink-0">
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                      <Progress value={milestone.progress} className="w-full h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The talented individuals behind our success, each bringing unique expertise and passion to our mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.twitter && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    )}
                    {member.social.github && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Our Workspace</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Where Innovation Happens
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our modern office space is designed to foster creativity, collaboration, and innovation. From open workspaces to quiet focus areas, we've created an environment where our team can do their best work.
              </p>
              <ul className="space-y-3">
                {["Open collaborative spaces", "State-of-the-art technology", "Wellness and recreation areas", "Flexible work arrangements"].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="elevated" size="lg">
                Visit Our Office
              </Button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1745970347652-8f22f5d7d3ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBtb2Rlcm4lMjBpbnRlcmlvciUyMGNsZWFufGVufDB8MHx8fDE3NTU3MjY2MzR8MA&ixlib=rb-4.1.0&q=85"
                alt="Modern office space by Deliberate Directions on Unsplash"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Want to Join Our Mission?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for innovation and excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="elevated" className="px-8">
                  View Open Positions
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Our Culture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}