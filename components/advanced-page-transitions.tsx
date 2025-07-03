"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface AdvancedPageTransitionsProps {
  children: ReactNode
}

// Different animation variants for different route types
const getPageVariants = (pathname: string) => {
  // Dashboard pages get a slide from right
  if (pathname.startsWith("/dashboard")) {
    return {
      initial: { opacity: 0, x: 25, scale: 0.99 },
      in: { opacity: 1, x: 0, scale: 1 },
      out: { opacity: 0, x: -25, scale: 1.01 },
    }
  }

  // Auth pages get a fade with slight scale
  if (pathname === "/login" || pathname === "/signup") {
    return {
      initial: { opacity: 0, scale: 0.99, y: 10 },
      in: { opacity: 1, scale: 1, y: 0 },
      out: { opacity: 0, scale: 1.01, y: -10 },
    }
  }

  // Contact page gets a slide from bottom
  if (pathname === "/contact") {
    return {
      initial: { opacity: 0, y: 15, scale: 0.99 },
      in: { opacity: 1, y: 0, scale: 1 },
      out: { opacity: 0, y: -15, scale: 1.01 },
    }
  }

  // Default animation for home and other pages
  return {
    initial: { opacity: 0, y: 10, scale: 0.99 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -10, scale: 1.01 },
  }
}

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for premium feel
  duration: 0.2,
}

export default function AdvancedPageTransitions({ children }: AdvancedPageTransitionsProps) {
  const pathname = usePathname()
  const variants = getPageVariants(pathname)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={pageTransition}
        className="min-h-screen"
        style={{
          // Ensure smooth rendering
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
