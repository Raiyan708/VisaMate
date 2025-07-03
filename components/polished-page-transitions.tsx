"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PolishedPageTransitionsProps {
  children: ReactNode
}

export default function PolishedPageTransitions({ children }: PolishedPageTransitionsProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Clean up any stuck transitions
  useEffect(() => {
    const cleanup = () => {
      setIsTransitioning(false)
      // Force restore full opacity
      document.body.style.opacity = "1"
      document.body.style.filter = "none"
    }

    const timer = setTimeout(cleanup, 300) // Cleanup after max transition time
    return () => clearTimeout(timer)
  }, [pathname])

  const variants = {
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

  const transition = {
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
    duration: 0.2,
    opacity: {
      duration: 0.15,
      ease: "easeInOut",
    },
  }

  return (
    <div className="relative w-full min-h-screen" style={{ opacity: 1 }}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          setIsTransitioning(false)
          // Ensure full opacity restoration
          document.body.style.opacity = "1"
        }}
      >
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          className="w-full min-h-screen"
          style={{
            opacity: 1,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            isolation: "isolate", // Prevent stacking context issues
          }}
          onAnimationStart={() => setIsTransitioning(true)}
          onAnimationComplete={() => {
            setIsTransitioning(false)
            // Force full opacity restoration
            const currentElement = document.querySelector(`[data-pathname="${pathname}"]`) as HTMLElement
            if (currentElement) {
              currentElement.style.opacity = "1"
              currentElement.style.transform = "none"
            }
          }}
        >
          <div
            data-pathname={pathname}
            className="w-full min-h-screen"
            style={{
              opacity: 1,
              transform: "none",
            }}
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fallback to ensure content is always visible */}
      {isTransitioning && (
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.01, // Nearly invisible fallback
            backgroundColor: "white",
          }}
        />
      )}
    </div>
  )
}
