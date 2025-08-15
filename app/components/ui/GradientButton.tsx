"use client"

import * as motion from "motion/react-client"

export type ButtonVariant = 'orange' | 'pink' | 'blue' | 'green' | 'purple' | 'red' | 'chaos'
export type ButtonStyle = 'solid' | 'animated-fill'

interface GradientButtonProps {
  variant?: ButtonVariant
  style?: ButtonStyle
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  animate?: {
    whileHover?: object
    whileTap?: object
    transition?: object
  } // For special animations like chaos button rotation
}

const gradients: Record<ButtonVariant, string> = {
  orange: 'from-orange-500 to-pink-500',
  pink: 'from-pink-500 to-red-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-indigo-500',
  red: 'from-red-500 to-rose-500',
  chaos: 'from-purple-600 to-pink-600'
}

export default function GradientButton({ 
  variant = 'orange',
  style = 'solid',
  children, 
  onClick, 
  className = '',
  disabled = false,
  fullWidth = false,
  icon,
  animate
}: GradientButtonProps) {
  
  // Special animations for specific variants
  const getAnimationProps = () => {
    if (animate) return animate
    
    if (variant === 'chaos') {
      return {
        whileHover: { scale: 1.05, rotate: 360 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.5 }
      }
    }
    
    return {
      whileHover: { scale: disabled ? 1 : 1.02 },
      whileTap: { scale: disabled ? 1 : 0.98 }
    }
  }

  const baseClasses = `
    relative overflow-hidden
    text-white font-semibold py-3 px-6 rounded-lg 
    shadow-md hover:shadow-lg transition-shadow
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `

  if (style === 'animated-fill') {
    // For future implementation of animated fill style (like CookingButton)
    return (
      <motion.button
        {...getAnimationProps()}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} bg-gray-700`}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} opacity-0 hover:opacity-100 transition-opacity duration-300`}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
          {icon}
        </span>
      </motion.button>
    )
  }

  // Default solid style
  return (
    <motion.button
      {...getAnimationProps()}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r ${gradients[variant]} 
        ${baseClasses}
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </motion.button>
  )
}