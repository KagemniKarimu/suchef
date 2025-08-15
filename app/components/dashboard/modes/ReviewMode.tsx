"use client";

import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { forwardRef, SVGProps, useState } from "react";
import AddRecipeModal, { RecipeFormData } from "../modals/AddRecipeModal";
import ComingSoonModal from "../modals/ComingSoonModal";
import { Recipe, initialRecipes } from "@/app/mock/RecipeData";

export default function ReviewMode() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState<{
    isOpen: boolean;
    feature: string;
  }>({
    isOpen: false,
    feature: "",
  });

  function setSlide(newDirection: 1 | -1) {
    const nextIndex = wrap(
      0,
      recipes.length,
      selectedRecipeIndex + newDirection,
    );
    setSelectedRecipeIndex(nextIndex);
    setDirection(newDirection);
  }

  const handleAddRecipe = (formData: RecipeFormData) => {
    const newRecipe: Recipe = {
      id: recipes.length + 1,
      name: formData.name,
      author: "You",
      description: formData.description,
      needsReview: 0,
      rating: 0,
      difficulty: formData.difficulty,
      cookingTime: formData.cookingTime,
      category: formData.category,
      color: "from-indigo-500 to-purple-500", // Default color for new recipes
      emoji: formData.emoji,
    };
    setRecipes([...recipes, newRecipe]);
  };

  const currentRecipe = recipes[selectedRecipeIndex];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-purple-500/10 p-6 border border-purple-500/30"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">
              Community Recipe Reviews ⭐
            </h2>
            <p className="text-gray-300 mt-1">
              Help the community by reviewing recipes others have created!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Recipe
          </motion.button>
        </div>

        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            initial={false}
            animate={{ backgroundColor: "rgba(147, 51, 234, 0.2)" }}
            aria-label="Previous"
            className="w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center transition-colors border border-purple-500/30"
            onClick={() => setSlide(-1)}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft />
          </motion.button>

          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <RecipeCard
              key={currentRecipe.id}
              recipe={currentRecipe}
              onReview={() =>
                setComingSoonModal({ isOpen: true, feature: "Recipe reviews" })
              }
              onSave={() =>
                setComingSoonModal({
                  isOpen: true,
                  feature: "Save to favorites",
                })
              }
            />
          </AnimatePresence>

          <motion.button
            initial={false}
            animate={{ backgroundColor: "rgba(147, 51, 234, 0.2)" }}
            aria-label="Next"
            className="w-12 h-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 flex items-center justify-center transition-colors border border-purple-500/30"
            onClick={() => setSlide(1)}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight />
          </motion.button>
        </div>

        {/* Recipe Counter */}
        <div className="flex justify-center mt-6 gap-2">
          {recipes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > selectedRecipeIndex ? 1 : -1);
                setSelectedRecipeIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedRecipeIndex
                  ? "bg-purple-500 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <AddRecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecipe}
      />

      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ isOpen: false, feature: "" })}
        featureName={comingSoonModal.feature}
      />
    </>
  );
}

const RecipeCard = forwardRef(function RecipeCard(
  {
    recipe,
    onReview,
    onSave,
  }: {
    recipe: Recipe;
    onReview: () => void;
    onSave: () => void;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const presenceDirection = usePresenceData();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: presenceDirection * 100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: presenceDirection * -100 }}
      className="w-full max-w-md"
    >
      <div className={`bg-gradient-to-br ${recipe.color} p-[2px] rounded-2xl`}>
        <div className="bg-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{recipe.emoji}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-100">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-400">by {recipe.author}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-500">
                {"⭐".repeat(Math.floor(recipe.rating))}
                <span className="text-sm text-gray-400 ml-1">
                  ({recipe.rating})
                </span>
              </div>
              <span className="text-xs text-purple-400">
                {recipe.needsReview} reviews needed
              </span>
            </div>
          </div>

          <p className="text-gray-300 mb-4">{recipe.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-xs text-gray-500">Difficulty</p>
              <p
                className={`font-semibold ${
                  recipe.difficulty === "easy"
                    ? "text-green-500"
                    : recipe.difficulty === "medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {recipe.difficulty.charAt(0).toUpperCase() +
                  recipe.difficulty.slice(1)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Time</p>
              <p className="font-semibold text-gray-300">
                {recipe.cookingTime}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Category</p>
              <p className="font-semibold text-gray-300">{recipe.category}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReview}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Review Recipe
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSave}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              Save
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/**
 * ==============   Icons   ================
 */
const iconsProps: SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function ArrowLeft() {
  return (
    <svg {...iconsProps}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg {...iconsProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
