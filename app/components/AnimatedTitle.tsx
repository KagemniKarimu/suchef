"use client"

import * as motion from "motion/react-client"

export default function AnimatedTitle() {
  return (
    <motion.h1
      className="text-7xl md:text-8xl font-black tracking-tight"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <motion.span
        className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent"
        animate={{ 
          backgroundPosition: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      >
        suchef
      </motion.span>
    </motion.h1>
  )
}