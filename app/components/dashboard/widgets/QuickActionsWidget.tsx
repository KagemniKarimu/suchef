"use client"

import * as motion from "motion/react-client"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import ComingSoonModal from "../modals/ComingSoonModal"

export default function QuickActionsWidget() {
  const pathname = usePathname()
  const router = useRouter()
  const [showComingSoon, setShowComingSoon] = useState(false)
  const isGuidePage = pathname?.includes('/guide') || pathname?.includes('/dashboard')

  const handleGuidedCookingClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isGuidePage) {
      // We're already on the guide page, show the coming soon modal
      setShowComingSoon(true)
    } else {
      // Navigate to cook page
      router.push('/cook')
    }
  }

  const handleFavoritesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Navigate to dashboard and trigger review mode
    router.push('/dashboard')
    // After navigation, we'd need to set the mode to "review"
    // This would require lifting state up or using a global state manager
    setTimeout(() => {
      // Trigger review mode after navigation
      const event = new CustomEvent('changeMode', { detail: 'review' })
      window.dispatchEvent(event)
    }, 100)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGuidedCookingClick}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-500/10 p-4 border border-blue-500/30 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👨‍🍳</span>
            <div>
              <h3 className="font-semibold text-gray-100">Guided Cooking</h3>
              <p className="text-sm text-gray-400">Step-by-step mode</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFavoritesClick}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg shadow-yellow-500/10 p-4 border border-yellow-500/30 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="font-semibold text-gray-100">My Favorites</h3>
              <p className="text-sm text-gray-400">Saved recipes</p>
            </div>
          </div>
        </motion.div>
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