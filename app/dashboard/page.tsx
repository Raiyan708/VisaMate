'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function DashboardPage() {
  return (
    <motion.div
      className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 tracking-tight leading-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome back to <span className="text-black dark:text-white">VisaMate</span>
        <motion.span
          className="inline-block ml-2"
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        >
          🚀
        </motion.span>
      </motion.h1>

      <motion.p
        className="max-w-2xl text-lg text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Ready to elevate your study abroad journey? Use the sidebar to start generating your SOPs, LORs, track visa tasks, and more — all powered by intelligent automation.
      </motion.p>

      <motion.div
        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
        Your journey begins here — powered by AI.
      </motion.div>
    </motion.div>
  )
}
