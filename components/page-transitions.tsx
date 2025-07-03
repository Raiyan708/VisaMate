"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface PageTransitionsProps {
  children: ReactNode
}

// Optimized variants with faster, more subtle animations
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.01,
  },
}

// Faster transition with proper timing
const pageTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.2,
  opacity: { duration: 0.15 }, // Slightly faster opacity for better perceived performance
}

export default function PageTransitions({ children }: PageTransitionsProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
          style={{
            // Ensure proper rendering and prevent visual glitches
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)", // Force hardware acceleration
          }}
          onAnimationComplete={() => {
            // Ensure opacity is fully restored after animation
            const element = document.querySelector("[data-page-content]") as HTMLElement
            if (element) {
              element.style.opacity = "1"
              element.style.transform = "none"
            }
          }}
        >
          <div data-page-content style={{ opacity: 1 }}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
