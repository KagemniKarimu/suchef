"use client"

import * as motion from "motion/react-client"

export default function HeroDescription() {
  return (
    <motion.p
      className="text-lg md:text-xl text-center max-w-2xl text-gray-600 dark:text-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      A <span className="font-semibold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">culinary intelligence</span> designed 
      to bring a rich, prosocial, tutor-like experience 
      to the practice of <span className="font-semibold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">digitally assisted cooking</span>. 
      Elevating your kitchen experience with <span className="font-semibold text-orange-500">AI insights</span>, 
      just like <span className="font-mono text-pink-500">sudo</span> elevates privileges.
    </motion.p>
  )
}