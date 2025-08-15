"use client"

import RecipeRandomizerWidget from "../widgets/RecipeRandomizerWidget"
import LeaderboardWidget from "../widgets/LeaderboardWidget"

export default function RandomizerMode() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RecipeRandomizerWidget />
      </div>
      <div className="lg:col-span-1">
        <LeaderboardWidget />
      </div>
    </div>
  )
}