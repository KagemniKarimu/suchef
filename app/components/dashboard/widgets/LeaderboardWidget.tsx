"use client";

import * as motion from "motion/react-client";
import { weeklyTopRecipes } from "@/app/mock/LeaderboardData";

export default function LeaderboardWidget() {
  const handleViewAllClick = () => {
    // Dispatch custom event to switch to review mode
    const event = new CustomEvent("changeMode", { detail: "review" });
    window.dispatchEvent(event);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-green-500/10 p-6 border border-green-500/30 sticky top-20"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-100">
          This Week&apos;s Top
        </h2>
        <span className="text-2xl">🏆</span>
      </div>

      {/* Leaderboard Items */}
      <div className="space-y-3">
        {weeklyTopRecipes.map((item) => (
          <motion.div
            key={item.rank}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
          >
            <span
              className={`font-bold text-lg ${
                item.rank === 1
                  ? "text-yellow-500"
                  : item.rank === 2
                    ? "text-gray-400"
                    : item.rank === 3
                      ? "text-orange-600"
                      : "text-gray-500"
              }`}
            >
              #{item.rank}
            </span>
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-medium text-gray-100">{item.name}</p>
              <p className="text-xs text-gray-400">by {item.chef}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-300">
                ⭐ {item.rating}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleViewAllClick}
        className="w-full mt-4 text-center text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        View All Rankings →
      </button>
    </motion.div>
  );
}
