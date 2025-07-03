'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = {
  id: number
  x: number
  y: number
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticles = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        x: Math.random() * viewportWidth,
        y: Math.random() * viewportHeight,
      }))

      setParticles(newParticles)
    }

    createParticles()
    window.addEventListener('resize', createParticles)
    return () => window.removeEventListener('resize', createParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-400/30 rounded-full"
          initial={{ x: p.x, y: p.y }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
