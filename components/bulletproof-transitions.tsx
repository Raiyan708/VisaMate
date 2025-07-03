"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useRef } from "react"

interface BulletproofTransitionsProps {
  children: ReactNode
}

export default function BulletproofTransitions({ children }: BulletproofTransitionsProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure opacity is always restored
  useEffect(() => {
    const restoreOpacity = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1"
      }
      document.body.style.opacity = "1"
      document.documentElement.style.opacity = "1"
    }

    // Immediate restoration
    restoreOpacity()

    // Delayed restoration as backup
    const timer = setTimeout(restoreOpacity, 50)

    return () => clearTimeout(timer)
  }, [pathname])

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

  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.2,
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen"
      style={{
        opacity: 1,
        position: "relative",
        isolation: "isolate",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full min-h-screen"
          style={{
            opacity: 1,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translate3d(0, 0, 0)", // Force GPU acceleration
          }}
          onAnimationComplete={(definition) => {
            // Only restore on animate completion, not exit
            if (definition === "animate") {
              if (containerRef.current) {
                containerRef.current.style.opacity = "1"
              }
              document.body.style.opacity = "1"
            }
          }}
        >
          <div style={{ opacity: 1, minHeight: "100vh" }}>{children}</div>
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
