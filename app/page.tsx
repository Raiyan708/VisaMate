"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Users, Shield, Calendar, Github, Linkedin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3 } from "lucide-react"
import { GraduationCap } from "lucide-react"
import { FileSignature } from "lucide-react"
import { CreditCard } from "lucide-react"
import FloatingParticles from "@/components/FloatingParticles"



// Floating particles component
// const FloatingParticles = () => {
//   const fallbackSize = { w: 1280, h: 720 }
//   const [viewport, setViewport] = useState(fallbackSize)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)

//     const updateViewport = () => {
//       setViewport({
//         w: window.innerWidth,
//         h: window.innerHeight,
//       })
//     }

//     updateViewport()
//     window.addEventListener("resize", updateViewport)
//     return () => window.removeEventListener("resize", updateViewport)
//   }, [])

//   if (!mounted) return null // Avoid SSR mismatch

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//       {[...Array(6)].map((_, i) => {
//         const x = Math.random() * viewport.w
//         const y = Math.random() * viewport.h

//         return (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-400/30 rounded-full"
//             initial={{ x, y }}
//             animate={{
//               x: Math.random() * viewport.w,
//               y: Math.random() * viewport.h,
//             }}
//             transition={{
//               duration: Math.random() * 10 + 20,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "linear",
//             }}
//           />
//         )
//       })}
//     </div>
//   )
// }

// Animated feature card component
const AnimatedFeatureCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 10 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="transform-gpu perspective-1000"
    >
      <motion.div
        whileHover={{
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)

  const heroIsInView = useInView(heroRef, { once: true })
  const featuresIsInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const ctaIsInView = useInView(ctaRef, { once: true, margin: "-100px" })

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link href="/" className="text-2xl font-bold font-debata text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition duration-300">
                VisaMate
              </Link>
            </motion.div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/pricing"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Pricing
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 py-20 px-4 transition-colors duration-300"
      >
        <FloatingParticles />

        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Text content */}
            <motion.div
              className="flex-1 lg:text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={heroIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Wanna Study Abroad? Same. Let's Not Mess It Up.
                <motion.span
                  className="text-blue-600 dark:text-blue-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                  {" "}
                  ✈️
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                VisaMate is your AI-powered bestie for everything from statements to checklists — no fake consultants,
                no drama, just results.
              </motion.p>
            </motion.div>

            {/* Right side - Illustration and Form */}
            <motion.div
              className="flex-1 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 100 }}
              animate={heroIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              {/* Placeholder illustration */}
              <motion.div
                className="mb-8 flex justify-center"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-64 h-48 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center border-2 border-blue-200 dark:border-slate-600"
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.1)",
                      "0 15px 40px rgba(59, 130, 246, 0.2)",
                      "0 10px 30px rgba(59, 130, 246, 0.1)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Study Abroad Journey</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Waitlist Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                whileHover={{ y: -5 }}
              >
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-2xl dark:text-white">Join the Waitlist</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Be the first to access VisaMate when we launch
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        placeholder="Full Name"
                        className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Select>
                        <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                          <SelectValue placeholder="Destination Country" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="germany">Germany</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Join Waitlist
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section ref={featuresRef} className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Everything you need to study abroad
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedFeatureCard delay={0}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">SOP Generator</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    AI-powered Statement of Purpose tailored to your profile and university
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard delay={0.1}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">LOR Assistant</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Generate professional Letters of Recommendation with personalized content
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard delay={0.2}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">Visa Checklist</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Country-specific visa requirements and document checklists
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>

            <AnimatedFeatureCard delay={0.3}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">Timeline Planner</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Personalized timeline with deadlines and milestones for your journey
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
            <AnimatedFeatureCard delay={0.3}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <BarChart3 className="w-12 h-12 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">Financial Summary</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Create a clean breakdown of your financial documents and funding sources
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
            <AnimatedFeatureCard delay={0.3}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">University Shortlisting</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    AI tool to help you discover best-fit universities based on your profile
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
            <AnimatedFeatureCard delay={0.3}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileSignature className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">Affidavit Generator</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Instantly create a legally formatted affidavit of support for your visa
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
            <AnimatedFeatureCard delay={0.3}>
              <Card className="text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow h-full dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <CreditCard className="w-12 h-12 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
                  </motion.div>
                  <CardTitle className="dark:text-white">Bank Statement Generator</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Automatically generate a formal-style bank statement for your visa process
                  </CardDescription>
                </CardHeader>
              </Card>
            </AnimatedFeatureCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="bg-gray-50 dark:bg-slate-800 py-20 px-4 transition-colors duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={ctaIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Ready to Ace Your Study Abroad Game?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            From SOPs and LORs to bank statements, affidavits, and university shortlisting — VisaMate has everything you need to conquer your journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={ctaIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/dashboard/sop">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg px-8 py-3"
              >
                Explore All Tools
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Student Testimonials Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Students Say About VisaMate</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from students who made it abroad with confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-shadow dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">SA</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Sarah A.</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Stanford University, USA</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "VisaMate's SOP generator helped me craft a compelling personal statement in just minutes. The AI
                    understood my background perfectly and created something I never could have written myself."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-shadow dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mr-4">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">MK</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Michael K.</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">University of Toronto, Canada</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "The visa checklist feature was a lifesaver! I almost missed submitting my financial documents.
                    VisaMate kept me organized throughout the entire application process."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-shadow dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">PR</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Priya R.</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">University of Melbourne, Australia</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "As an international student, the timeline planner helped me stay on track with all my deadlines. I
                    got my visa approved on the first try thanks to VisaMate's guidance."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-1 lg:col-start-2"
            >
              <Card className="h-full hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-orange-500/10 transition-shadow dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mr-4">
                      <span className="text-orange-600 dark:text-orange-400 font-semibold text-lg">DL</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">David L.</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Imperial College London, UK</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "The LOR generator made it so easy to help my professors write strong recommendation letters. The
                    templates were professional and saved everyone time."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of students who've successfully applied abroad
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-lg px-8 py-3"
                >
                  Start Your Journey Today
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 px-4 bg-gray-50 dark:bg-slate-800 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to know about VisaMate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  value: "item-1",
                  question: "Why should I trust VisaMate's AI SOP and LOR tools?",
                  answer:
                    "Our AI is trained on hundreds of successful SOPs. VisaMate helps you craft personalized, structure-aware documents in your own voice.",
                },
                {
                  value: "item-2",
                  question: "Is this better than what consultants provide?",
                  answer:
                    "Most consultants use templates. VisaMate gives you instant, personalized, editable SOPs and LORs — you stay in control.",
                },
                {
                  value: "item-3",
                  question: "Is VisaMate free to use?",
                  answer:
                    "Yes — core tools are free during beta. Even future paid tools will stay affordable for students.",
                },
                {
                  value: "item-4",
                  question: "Can AI-written SOPs get rejected?",
                  answer:
                    "No — VisaMate helps you create clear, structured content that you fully control. Nothing is submitted without your review.",
                },
                {
                  value: "item-5",
                  question: "How secure is my personal information?",
                  answer:
                    "We take privacy seriously. Your personal data is encrypted and never shared with third parties. You can delete your information anytime.",
                },
                {
                  value: "item-6",
                  question: "Which countries and universities does VisaMate support?",
                  answer:
                    "We support applications to universities in the US, Canada, UK, Australia, Germany, and more. Our tools adapt to different application requirements and formats.",
                },
                {
                  value: "item-7",
                  question: "How long does it take to generate an SOP or LOR?",
                  answer:
                    "Most documents are generated within 2-3 minutes. You can then edit, refine, and customize them to perfectly match your needs.",
                },
                {
                  value: "item-8",
                  question: "What if I need help or have questions?",
                  answer:
                    "We provide comprehensive guides and email support. Our community of students also shares tips and experiences to help you succeed.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={item.value}
                    className="border border-gray-200 dark:border-slate-600 rounded-lg px-6 dark:bg-slate-700/50"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">Still have questions?</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600"
                >
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 transition-colors duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Built by a student, for students
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: -5 }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </motion.div>
          <motion.div
            className="mt-8 pt-8 border-t border-gray-800 dark:border-slate-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400">© 2024 VisaMate. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
