"use client";

import * as motion from "motion/react-client";

const recentDishes = [
  { name: "Pasta Aglio e Olio", emoji: "🍝", time: "2 days ago" },
  { name: "Chicken Tikka", emoji: "🍗", time: "2 days ago" },
  { name: "Caesar Salad", emoji: "🥗", time: "2 days ago" },
  { name: "Banana Bread", emoji: "🍞", time: "2 days ago" },
];

export default function RecentActivityWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl shadow-gray-500/10 p-6 border border-gray-600"
    >
      <h2 className="text-xl font-bold text-gray-100 mb-4">
        Your Recent Cooks
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recentDishes.map((dish) => (
          <div
            key={dish.name}
            className="text-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 cursor-pointer transition-colors border border-gray-600"
          >
            <div className="text-3xl mb-2">{dish.emoji}</div>
            <p className="text-sm font-medium text-gray-300">{dish.name}</p>
            <p className="text-xs text-gray-400 mt-1">{dish.time}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
