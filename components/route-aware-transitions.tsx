"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface RouteAwareTransitionsProps {
  children: ReactNode
}

// Define route hierarchy for directional animations
const routeHierarchy = {
  "/": 0,
  "/login": 1,
  "/signup": 1,
  "/contact": 1,
  "/dashboard": 2,
  "/dashboard/sop": 3,
  "/dashboard/lor": 3,
  "/dashboard/visa": 3,
  "/dashboard/bank": 3,
  "/dashboard/timeline": 3,
}

const getTransitionDirection = (currentPath: string, previousPath: string) => {
  const currentLevel = routeHierarchy[currentPath as keyof typeof routeHierarchy] ?? 0
  const previousLevel = routeHierarchy[previousPath as keyof typeof routeHierarchy] ?? 0

  return currentLevel > previousLevel ? "forward" : "backward"
}

export default function RouteAwareTransitions({ children }: RouteAwareTransitionsProps) {
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState(pathname)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  useEffect(() => {
    if (pathname !== previousPath) {
      setDirection(getTransitionDirection(pathname, previousPath))
      setPreviousPath(pathname)
    }
  }, [pathname, previousPath])

  const variants = {
    initial: {
      opacity: 0,
      x: direction === "forward" ? 15 : -15,
      y: 5,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: direction === "forward" ? -15 : 15,
      y: -5,
      scale: 1.01,
    },
  }

  const transition = {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.2,
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
        className="min-h-screen"
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
