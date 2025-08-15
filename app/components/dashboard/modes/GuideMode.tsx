"use client"

import { useState } from "react"
import * as motion from "motion/react-client"
import QuickActionsWidget from "../widgets/QuickActionsWidget"
import ComingSoonModal from "../modals/ComingSoonModal"

const recipeLevels = [
  { 
    level: "Beginner", 
    description: "Simple recipes with basic techniques" 
  },
  { 
    level: "Intermediate", 
    description: "Recipes requiring some experience" 
  },
  { 
    level: "Advanced", 
    description: "Complex dishes for experienced cooks" 
  }
]

export default function GuideMode() {
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleRecipeClick = () => {
    setShowComingSoon(true)
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 p-6 border border-green-500/30">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Guided Cooking Mode 👨‍🍳
        </h2>
        <p className="text-gray-300 mb-6">
          Select a recipe and I&apos;ll guide you through each step with timers, tips, and technique videos.
        </p>
        
        <div className="space-y-4">
          {recipeLevels.map(({ level, description }) => (
            <button
              key={level}
              onClick={handleRecipeClick}
              className="w-full p-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg border border-gray-600 text-left transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-100">{level} Recipes</h3>
                  <p className="text-sm text-gray-400 mt-1">{description}</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-1">
        <QuickActionsWidget />
      </div>
    </motion.div>

    <ComingSoonModal
      isOpen={showComingSoon}
      onClose={() => setShowComingSoon(false)}
      featureName="Guided Cooking Mode"
      customMessage="For now, please use Nyanya in interactive mode! Toggle Nyanya on from the top-right corner and say 'Guide me through making [your recipe]' to get step-by-step cooking instructions."
    />
    </>
  )
}