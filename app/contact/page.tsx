"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, MessageCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Top Navbar */}
        <motion.nav
          className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700 transition-colors duration-300"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  VisaMate
                </Link>
              </motion.div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
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

        {/* Contact Page Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back to Home Link */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span whileHover={{ scale: 1.05, x: -5 }}>
                <Link
                  href="/"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </motion.span>
            </motion.div>

            {/* Page Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have questions about VisaMate? We're here to help you succeed in your study abroad journey.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 dark:text-white">
                        <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        Email Support
                      </CardTitle>
                      <CardDescription className="dark:text-gray-300">
                        Get in touch via email for detailed support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.a
                        href="mailto:support@visamate.com"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium text-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        support@visamate.com
                      </motion.a>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">We typically respond within 24 hours</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 dark:text-white">
                        <motion.div whileHover={{ rotate: -10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </motion.div>
                        WhatsApp Support
                      </CardTitle>
                      <CardDescription className="dark:text-gray-300">Quick support via WhatsApp</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-medium text-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        +1 (234) 567-8900
                      </motion.a>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Available Monday - Friday, 9 AM - 6 PM EST
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-lg border dark:border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">💡 Before you contact us:</h3>
                  <motion.ul
                    className="text-blue-800 dark:text-blue-200 space-y-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {[
                      "Check our FAQ section for quick answers",
                      "Include your email address for faster response",
                      "Be specific about your question or issue",
                      "Mention which tool you're having trouble with",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      >
                        • {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="dark:text-white">Send us a Message</CardTitle>
                      <CardDescription className="dark:text-gray-300">
                        Fill out the form below and we'll get back to you soon
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <Label htmlFor="fullName" className="dark:text-white">
                              Full Name
                            </Label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                placeholder="Enter your full name"
                                className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <Label htmlFor="email" className="dark:text-white">
                              Email Address
                            </Label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            <Label htmlFor="message" className="dark:text-white">
                              Message
                            </Label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Textarea
                                id="message"
                                name="message"
                                required
                                placeholder="Tell us how we can help you..."
                                rows={6}
                                className="w-full resize-none dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                              size="lg"
                            >
                              {isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                />
                              ) : (
                                "Send Message"
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      ) : (
                        <motion.div
                          className="text-center py-8"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                          </motion.div>
                          <motion.h3
                            className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            Message Sent!
                          </motion.h3>
                          <motion.p
                            className="text-gray-600 dark:text-gray-300 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            Thank you for contacting us. We'll get back to you within 24 hours.
                          </motion.p>
                          <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                              >
                                Send Another Message
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Link href="/">
                                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                  Back to Home
                                </Button>
                              </Link>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
