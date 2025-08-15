"use client";

import { useState } from "react";
import * as motion from "motion/react-client";

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: RecipeFormData) => void;
}

export interface RecipeFormData {
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  emoji: string;
}

const commonFoodEmojis = [
  "🍜",
  "🍝",
  "🍛",
  "🥩",
  "🍫",
  "🍤",
  "🍕",
  "🍔",
  "🌮",
  "🥗",
  "🍣",
  "🍱",
  "🥟",
  "🍲",
  "🍖",
  "🍗",
  "🥘",
  "🍰",
  "🧁",
  "🥧",
  "🍞",
  "🥐",
  "🍳",
  "🥞",
  "🧀",
  "🍟",
  "🌭",
  "🥪",
  "🍩",
  "🍪",
];

export default function AddRecipeModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRecipeModalProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    difficulty: "medium",
    category: "",
    emoji: "🍽️",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      instructions: "",
      cookingTime: "",
      difficulty: "medium",
      category: "",
      emoji: "🍽️",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            Add New Recipe 🍳
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Recipe Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Spicy Thai Noodles"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Emoji
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onClick={(e) => {
                    e.preventDefault();
                    const btn = e.currentTarget;
                    const picker = btn.nextElementSibling as HTMLElement;
                    if (picker) {
                      picker.style.display =
                        picker.style.display === "none" ? "block" : "none";
                    }
                  }}
                >
                  {formData.emoji}
                </button>
                <div
                  className="absolute top-full mt-2 left-0 bg-gray-700 border border-gray-600 rounded-lg p-2 grid grid-cols-5 gap-1 z-10 hidden"
                  style={{ display: "none" }}
                >
                  {commonFoodEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="text-xl p-1 hover:bg-gray-600 rounded"
                      onClick={() => {
                        setFormData({ ...formData, emoji });
                        const picker = document.querySelector(
                          ".absolute.top-full",
                        ) as HTMLElement;
                        if (picker) picker.style.display = "none";
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={2}
              placeholder="Brief description of your recipe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cooking Time
              </label>
              <input
                type="text"
                required
                value={formData.cookingTime}
                onChange={(e) =>
                  setFormData({ ...formData, cookingTime: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., 30 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as "easy" | "medium" | "hard",
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Thai, Italian, Dessert"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Ingredients
            </label>
            <textarea
              required
              value={formData.ingredients}
              onChange={(e) =>
                setFormData({ ...formData, ingredients: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={4}
              placeholder="List ingredients, one per line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Instructions
            </label>
            <textarea
              required
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={5}
              placeholder="Step-by-step cooking instructions"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Add Recipe
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
