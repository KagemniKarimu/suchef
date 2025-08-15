"use client"

import { useState } from "react"
import Card from "../../ui/Card"
import GradientButton from "../../ui/GradientButton"

export default function NyanyaWidget() {
  const [ingredients, setIngredients] = useState("")
  
  return (
    <Card variant="orange" delay={0.1}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-100">
          Nyanya 
          <span className="text-sm font-normal text-gray-400 ml-2">
            (Pantry → Recipes)
          </span>
        </h2>
        <span className="text-3xl">🥘</span>
      </div>
      
      <p className="text-gray-300 mb-4">
        Tell me what ingredients you have, and I&apos;ll suggest recipes!
      </p>
      
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="e.g., chicken, rice, tomatoes..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <GradientButton variant="orange" fullWidth>
          Find Recipes
        </GradientButton>
      </div>
      
      {/* Recent Matches Placeholder */}
      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-400">Recent matches:</p>
        <div className="flex gap-2 flex-wrap">
          {["Fried Rice", "Chicken Stir-fry", "Tomato Pasta"].map((recipe) => (
            <span
              key={recipe}
              className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
            >
              {recipe}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}