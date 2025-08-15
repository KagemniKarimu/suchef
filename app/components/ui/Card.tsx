"use client"

import * as motion from "motion/react-client"

type CardVariant = 'default' | 'orange' | 'pink' | 'blue' | 'green' | 'purple'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: CardVariant
  delay?: number
}

const variants: Record<CardVariant, { border: string; shadow: string }> = {
  default: { border: 'border-gray-600', shadow: 'shadow-gray-500/10' },
  orange: { border: 'border-orange-500/30', shadow: 'shadow-orange-500/10' },
  pink: { border: 'border-pink-500/30', shadow: 'shadow-pink-500/10' },
  blue: { border: 'border-blue-500/30', shadow: 'shadow-blue-500/10' },
  green: { border: 'border-green-500/30', shadow: 'shadow-green-500/10' },
  purple: { border: 'border-purple-500/30', shadow: 'shadow-purple-500/10' },
}

export default function Card({ 
  children, 
  className = '',
  variant = 'default',
  delay = 0
}: CardProps) {
  const { border, shadow } = variants[variant]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl ${shadow} p-6 border ${border} ${className}`}
    >
      {children}
    </motion.div>
  )
}