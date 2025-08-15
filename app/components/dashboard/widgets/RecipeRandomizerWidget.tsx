"use client"

import { useState } from "react"
import * as motion from "motion/react-client"
import Card from "../../ui/Card"
import GradientButton from "../../ui/GradientButton"
import { cuisineOptions, cookingTimeOptions, difficultyOptions, dietaryOptions } from "@/app/mock/FilterOptionsData"

export default function RecipeRandomizerWidget() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [isHoveringDice, setIsHoveringDice] = useState(false)
  
  const toggleDietary = (option: string) => {
    setSelectedDietary(prev => 
      prev.includes(option) 
        ? prev.filter(d => d !== option)
        : [...prev, option]
    )
  }

  const handleRandomize = () => {
    // This would trigger the actual randomization
    console.log("Randomizing with:", {
      cuisine: selectedCuisine,
      time: selectedTime,
      difficulty: selectedDifficulty,
      dietary: selectedDietary
    })
  }

  const getDifficultyEmoji = (difficulty: string) => {
    switch(difficulty) {
      case "Easy": return "🟢"
      case "Medium": return "🟡"
      case "Hard": return "🔴"
      default: return ""
    }
  }

  const getTimeEmoji = (time: string) => {
    if (time.includes("Under 15")) return "⚡"
    if (time.includes("15-30")) return "🚀"
    if (time.includes("30-45")) return "⏱️"
    if (time.includes("45-60")) return "⏰"
    if (time.includes("1-2")) return "🕐"
    return "⏳"
  }
  
  return (
    <Card variant="pink" delay={0.2}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-100">
          Recipe Randomizer
        </h2>
        <motion.span 
          className="text-3xl cursor-pointer"
          onHoverStart={() => setIsHoveringDice(true)}
          onHoverEnd={() => setIsHoveringDice(false)}
          animate={isHoveringDice ? {
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          } : {
            rotate: 0,
            scale: 1
          }}
          transition={{ duration: 0.5 }}
        >
          🎲
        </motion.span>
      </div>
      
      <p className="text-gray-300 mb-6">
        Feeling adventurous? Let fate decide your next meal!
      </p>
      
      {/* Cuisine Selection - Enhanced */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
          <span>🌍</span> Cuisine Type
        </label>
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-600 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:border-pink-400 transition-all cursor-pointer"
        >
          <option value="">🎲 Surprise me with any cuisine!</option>
          <optgroup label="Asian">
            {["Japanese", "Chinese", "Thai", "Korean", "Vietnamese", "Indian"].map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </optgroup>
          <optgroup label="African">
            {["Ethiopian", "Moroccan", "Nigerian", "South African", "Egyptian", "Kenyan"].map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </optgroup>
          <optgroup label="European">
            {["Italian", "French", "Greek", "Mediterranean"].map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </optgroup>
          <optgroup label="Americas">
            {["Mexican", "American"].map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Cooking Time - Enhanced */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
          <span>⏱️</span> Cooking Time
        </label>
        <div className="grid grid-cols-2 gap-2">
          {cookingTimeOptions.slice(0, 4).map((time) => (
            <motion.button
              key={time}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTime(selectedTime === time ? "" : time)}
              className={`px-3 py-2 border-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                selectedTime === time
                  ? "border-pink-500 bg-gradient-to-r from-pink-500/30 to-pink-600/30 text-pink-200 shadow-lg shadow-pink-500/20"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500"
              }`}
            >
              <span className="text-base">{getTimeEmoji(time)}</span>
              <span>{time}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Difficulty - Enhanced */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
          <span>💪</span> Difficulty Level
        </label>
        <div className="flex gap-2">
          {difficultyOptions.map((difficulty) => (
            <motion.button
              key={difficulty}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? "" : difficulty)}
              className={`flex-1 px-4 py-2.5 border-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                selectedDifficulty === difficulty
                  ? "border-pink-500 bg-gradient-to-r from-pink-500/30 to-pink-600/30 text-pink-200 shadow-lg shadow-pink-500/20"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500"
              }`}
            >
              <span>{getDifficultyEmoji(difficulty)}</span>
              <span>{difficulty}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions - Enhanced */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-3">
          <span>🥗</span> Dietary Preferences
          <span className="text-xs font-normal text-gray-400">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((dietary) => (
            <motion.button
              key={dietary}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleDietary(dietary)}
              className={`px-3 py-1.5 border-2 rounded-full text-xs font-medium transition-all ${
                selectedDietary.includes(dietary)
                  ? "border-pink-500 bg-gradient-to-r from-pink-500/30 to-pink-600/30 text-pink-200 shadow-md shadow-pink-500/20"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500"
              }`}
            >
              {dietary}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700/50 mb-4"></div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <GradientButton 
          variant="pink" 
          className="flex-1"
          onClick={handleRandomize}
        >
          Randomize!
        </GradientButton>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <GradientButton variant="chaos" className="px-4">
            🌀
          </GradientButton>
        </motion.div>
      </div>
    </Card>
  )
}