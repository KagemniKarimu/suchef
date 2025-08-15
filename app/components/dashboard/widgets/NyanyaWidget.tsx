"use client";

import { useState } from "react";
import Card from "../../ui/Card";
import GradientButton from "../../ui/GradientButton";
import RecipeModal from "../modals/RecipeModal";

export default function NyanyaWidget() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [recipeContent, setRecipeContent] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");

  const handleFindRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setModalOpen(true); // Open modal immediately to show loading
    setRecipeTitle("Finding Recipe");
    setRecipeContent("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "nyanya",
          message: `I have these ingredients: ${ingredients}. What can I make?`,
          context: { ingredients: ingredients.split(",").map((i) => i.trim()) },
        }),
      });

      const data = await res.json();

      // Extract recipe title from response (first line or generic)
      const lines = data.message.split("\n");
      const title = lines[0].replace(/[*#]/g, "").trim() || "Your Recipe";

      setRecipeTitle(title);
      setRecipeContent(data.message);
    } catch (error) {
      console.error("Failed to get recipes:", error);
      setRecipeContent(
        "Let me think about what you can make with those ingredients... Try again in a moment!",
      );
      setRecipeTitle("Recipe Suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RecipeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={recipeTitle}
        content={recipeContent}
        ingredients={ingredients
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i)}
        isLoading={loading}
      />

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFindRecipes();
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="e.g., chicken, rice, tomatoes..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={loading}
          />
          <GradientButton
            variant="orange"
            fullWidth
            onClick={handleFindRecipes}
            disabled={loading || !ingredients.trim()}
          >
            {loading ? "Finding recipes..." : "Find Recipes"}
          </GradientButton>
        </form>

        {/* Recent Matches Placeholder */}
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-400">Recent matches:</p>
          <div className="flex gap-2 flex-wrap">
            {["Fried Rice", "Chicken Stir-fry", "Tomato Pasta"].map(
              (recipe) => (
                <span
                  key={recipe}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
                >
                  {recipe}
                </span>
              ),
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
