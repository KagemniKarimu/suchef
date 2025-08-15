"use client"

import * as motion from "motion/react-client"

interface NavItem {
  id: string
  label: string
  emoji: string
  description: string
  color: string
}

const navItems: NavItem[] = [
  {
    id: "learn",
    label: "Learn/Chat",
    emoji: "💬",
    description: "Ask questions and learn techniques",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "nyanya",
    label: "Nyanya Mode",
    emoji: "🥘",
    description: "Get substitutions and recipe suggestions",
    color: "from-orange-500 to-pink-500"
  },
  {
    id: "randomizer",
    label: "Randomizer",
    emoji: "🎲",
    description: "Discover random recipes",
    color: "from-pink-500 to-red-500"
  },
  {
    id: "guide",
    label: "Guide Me",
    emoji: "👨‍🍳",
    description: "Step-by-step cooking guidance",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "review",
    label: "Review",
    emoji: "⭐",
    description: "Rate and review community recipes",
    color: "from-purple-500 to-indigo-500"
  }
]

interface CircleNavWidgetProps {
  activeMode: string
  onModeChange: (mode: string) => void
}

export default function CircleNavWidget({ activeMode, onModeChange }: CircleNavWidgetProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {navItems.map((item, index) => {
        const isActive = activeMode === item.id
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <motion.button
              onClick={() => onModeChange(item.id)}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${item.color} shadow-lg shadow-current/30` 
                  : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={isActive ? {
                boxShadow: [
                  "0 0 20px rgba(251, 146, 60, 0.3)",
                  "0 0 30px rgba(251, 146, 60, 0.5)",
                  "0 0 20px rgba(251, 146, 60, 0.3)",
                ]
              } : {}}
              transition={isActive ? {
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
            >
              <span className={isActive ? "filter drop-shadow-md" : ""}>
                {item.emoji}
              </span>
              
              {/* Active indicator ring */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-30`}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
            
            {/* Tooltip */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap border border-gray-700">
                <div className="font-semibold">{item.label}</div>
                <div className="text-gray-400 text-[10px]">{item.description}</div>
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}