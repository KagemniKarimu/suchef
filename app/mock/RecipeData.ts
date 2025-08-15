export interface Recipe {
  id: number
  name: string
  author: string
  description: string
  needsReview: number
  rating: number
  difficulty: "easy" | "medium" | "hard"
  cookingTime: string
  category: string
  color: string
  emoji: string
}

export const initialRecipes: Recipe[] = [
  { 
    id: 1, 
    name: "Spicy Ramen", 
    author: "ChefMike", 
    description: "A fiery bowl of Japanese noodles with rich broth",
    needsReview: 3, 
    rating: 4.5, 
    difficulty: "medium", 
    cookingTime: "45 min",
    category: "Japanese",
    color: "from-red-500 to-orange-500",
    emoji: "🍜"
  },
  { 
    id: 2, 
    name: "Classic Carbonara", 
    author: "PastaLover", 
    description: "Creamy Italian pasta with bacon and parmesan",
    needsReview: 5, 
    rating: 4.8, 
    difficulty: "easy", 
    cookingTime: "20 min",
    category: "Italian",
    color: "from-yellow-500 to-amber-500",
    emoji: "🍝"
  },
  { 
    id: 3, 
    name: "Thai Green Curry", 
    author: "SpiceKing", 
    description: "Aromatic and spicy Thai curry with vegetables",
    needsReview: 2, 
    rating: 4.6, 
    difficulty: "medium", 
    cookingTime: "35 min",
    category: "Thai",
    color: "from-green-500 to-emerald-500",
    emoji: "🍛"
  },
  { 
    id: 4, 
    name: "Beef Wellington", 
    author: "GordonFan", 
    description: "Elegant beef wrapped in puff pastry",
    needsReview: 7, 
    rating: 4.9, 
    difficulty: "hard", 
    cookingTime: "2 hours",
    category: "British",
    color: "from-purple-500 to-pink-500",
    emoji: "🥩"
  },
  { 
    id: 5, 
    name: "Chocolate Soufflé", 
    author: "SweetTooth", 
    description: "Light and airy chocolate dessert",
    needsReview: 4, 
    rating: 4.7, 
    difficulty: "hard", 
    cookingTime: "40 min",
    category: "Dessert",
    color: "from-amber-700 to-amber-900",
    emoji: "🍫"
  },
  { 
    id: 6, 
    name: "Pad Thai", 
    author: "StreetFoodLover", 
    description: "Classic Thai stir-fried noodles",
    needsReview: 1, 
    rating: 4.4, 
    difficulty: "easy", 
    cookingTime: "25 min",
    category: "Thai",
    color: "from-blue-500 to-cyan-500",
    emoji: "🍤"
  },
]