"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CookingButton() {
    const progress = useMotionValue(0)
    const router = useRouter()
    const [isHolding, setIsHolding] = useState(false)

    // Button transforms
    const buttonScale = useTransform(progress, [0, 0.5, 1], [1, 0.95, 0.9])
    const buttonProgressX = useTransform(progress, [0, 1], ["-200%", "0%"])
    
    // Color transforms - orange to red gradient
    const buttonBgColor = useTransform(
        progress, 
        [0, 0.5, 1], 
        ["rgb(251, 146, 60)", "rgb(239, 68, 68)", "rgb(220, 38, 38)"]
    )
    
    // Heat wave effects
    const heatWaveOpacity = useTransform(progress, [0, 0.3, 1], [0, 0.6, 1])
    const heatWaveScale = useTransform(progress, [0, 1], [0.8, 1.2])
    const heatWaveY = useTransform(progress, [0, 1], [0, -10])

    const handleComplete = () => {
        if (progress.get() >= 0.95) {
            router.push('/dashboard')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ 
                position: 'relative', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
            }}
        >
            {/* Heat waves */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    opacity: heatWaveOpacity,
                    scale: heatWaveScale,
                    y: heatWaveY,
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '200px',
                            height: '60px',
                            left: '-100px',
                            top: `-${30 + i * 15}px`,
                            background: `linear-gradient(90deg, transparent, rgba(251, 146, 60, ${0.3 - i * 0.1}), transparent)`,
                            borderRadius: '50%',
                            filter: 'blur(8px)',
                        }}
                        animate={{
                            y: [-5, -15, -5],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>

            <motion.button
                style={{
                    scale: buttonScale,
                    position: 'relative',
                    isolation: 'isolate',
                    overflow: 'hidden',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-semibold rounded-full text-lg shadow-lg"
                onPointerDown={() => {
                    setIsHolding(true)
                    progress.set(0)
                    animate(progress, 1, {
                        duration: 1.5,
                        ease: "easeOut",
                        onComplete: handleComplete
                    })
                }}
                onPointerUp={() => {
                    setIsHolding(false)
                    if (progress.get() < 0.95) {
                        animate(progress, 0, { duration: 0.3 })
                    }
                }}
                onPointerLeave={() => {
                    setIsHolding(false)
                    animate(progress, 0, { duration: 0.3 })
                }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: buttonBgColor,
                        borderRadius: '999px',
                        zIndex: -1,
                        x: buttonProgressX,
                    }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        borderRadius: '999px',
                        zIndex: -1,
                        opacity: heatWaveOpacity,
                    }}
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                
                <span style={{ 
                    pointerEvents: 'none', 
                    position: 'relative',
                    zIndex: 1,
                    fontSize: '18px',
                    fontWeight: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <span>{isHolding ? "Keep holding..." : "Let's Cook"}</span>
                    <span style={{ fontSize: '24px' }}>🍳</span>
                </span>
            </motion.button>

            {/* Progress ring */}
            <motion.svg
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    opacity: progress,
                }}
                width="200"
                height="80"
                viewBox="0 0 200 80"
            >
                <motion.rect
                    x="10"
                    y="10"
                    width="180"
                    height="60"
                    rx="30"
                    fill="none"
                    stroke="rgba(251, 146, 60, 0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                        pathLength: progress,
                        strokeDasharray: 1,
                        strokeDashoffset: 0,
                    }}
                />
            </motion.svg>
            
            {/* Instruction text */}
            <motion.p 
                className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                Hold the button to start your cooking journey
            </motion.p>
        </motion.div>
    )
}