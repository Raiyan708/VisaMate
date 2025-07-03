"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThemeToggle } from "@/components/theme-toggle"

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    priceINR: "₹0",
    priceUSD: "$0",
    period: "forever",
    features: [
      "1 SOP generation",
      "1 LOR generation",
      "No saved documents",
      "Basic support",
      "Access to timeline planner",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Standard",
    description: "Best for active applicants",
    priceINR: "₹499",
    priceUSD: "$6",
    period: "per month",
    features: [
      "Unlimited SOPs/LORs",
      "Document storage & history",
      "Timeline generator",
      "Visa checklist tool",
      "Email support",
      "Export to PDF",
    ],
    buttonText: "Upgrade Now",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Premium",
    description: "Complete study abroad toolkit",
    priceINR: "₹999",
    priceUSD: "$12",
    period: "per month",
    features: [
      "All Standard features",
      "University shortlisting AI",
      "Visa appeal letter generator",
      "Financial statement tools",
      "Priority support",
      "1-on-1 consultation call",
    ],
    buttonText: "Go Premium",
    buttonVariant: "default" as const,
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.",
  },
  {
    question: "What happens to my documents if I downgrade?",
    answer:
      "Your documents remain safe. However, you may lose access to premium features like unlimited generations and advanced tools until you upgrade again.",
  },
  {
    question: "Do you offer student discounts?",
    answer:
      "Yes! We offer additional discounts for students with valid .edu email addresses. Contact our support team to learn more about available discounts.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "We offer a generous free plan to get you started. For paid features, you can try them risk-free with our 7-day money-back guarantee.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI (for Indian users), and PayPal. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
  },
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("USD")

  return (
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

      {/* Pricing Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your VisaMate Plan</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Flexible plans tailored for every student. Start free or upgrade anytime.
            </p>

            {/* Currency Toggle */}
            <motion.div
              className="inline-flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border dark:border-slate-700"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currency === "USD"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currency === "INR"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                INR (₹)
              </button>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 hover:bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${plan.popular ? "ring-2 ring-blue-600 dark:ring-blue-500" : ""} dark:bg-slate-800 dark:border-slate-700`}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl dark:text-white">{plan.name}</CardTitle>
                    <CardDescription className="dark:text-gray-300">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {currency === "INR" ? plan.priceINR : plan.priceUSD}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant={plan.buttonVariant}
                        className={`w-full ${
                          plan.buttonVariant === "default"
                            ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            : "dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                        }`}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need to know about our pricing</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-gray-200 dark:border-slate-600 rounded-lg px-6 dark:bg-slate-800/50"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16 py-12 bg-blue-50 dark:bg-slate-800/50 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to start your study abroad journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have successfully applied abroad with VisaMate's AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Start Free Today
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
