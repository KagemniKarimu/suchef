export interface LeaderboardItem {
  rank: number;
  name: string;
  chef: string;
  rating: number;
  emoji: string;
}

export const weeklyTopRecipes: LeaderboardItem[] = [
  { rank: 1, name: "Spicy Ramen", chef: "ChefMike", rating: 4.9, emoji: "🍜" },
  {
    rank: 2,
    name: "Classic Carbonara",
    chef: "PastaLover",
    rating: 4.8,
    emoji: "🍝",
  },
  {
    rank: 3,
    name: "Thai Green Curry",
    chef: "SpiceKing",
    rating: 4.7,
    emoji: "🍛",
  },
  {
    rank: 4,
    name: "Beef Wellington",
    chef: "GordonFan",
    rating: 4.6,
    emoji: "🥩",
  },
  {
    rank: 5,
    name: "Chocolate Soufflé",
    chef: "SweetTooth",
    rating: 4.5,
    emoji: "🍫",
  },
];

export const monthlyTopRecipes: LeaderboardItem[] = [
  {
    rank: 1,
    name: "Homemade Pizza",
    chef: "ItalianChef",
    rating: 4.95,
    emoji: "🍕",
  },
  {
    rank: 2,
    name: "Sushi Platter",
    chef: "TokyoMaster",
    rating: 4.9,
    emoji: "🍣",
  },
  { rank: 3, name: "BBQ Ribs", chef: "GrillKing", rating: 4.85, emoji: "🍖" },
  { rank: 4, name: "Paella", chef: "SpanishCook", rating: 4.8, emoji: "🥘" },
  {
    rank: 5,
    name: "Tiramisu",
    chef: "DessertQueen",
    rating: 4.75,
    emoji: "🍰",
  },
];
