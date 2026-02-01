import type { MenuItem } from "../domain/types";

export const MENU: MenuItem[] = [
  {
    id: "coffee_emerald_latte",
    name: "Emerald Garden Latte",
    description: "Velvety espresso, toasted vanilla, and a whisper of herb sweetness.",
    category: "coffee",
    priceCents: 575,
    tags: ["signature", "smooth"],
    isNew: true,
    imageEmoji: "🌿",
    points: 8
  },
  {
    id: "coffee_caramel_moss",
    name: "Caramel Moss Cold Brew",
    description: "Cold brew with caramel depth and bright citrus finish.",
    category: "coffee",
    priceCents: 525,
    tags: ["cold", "bold"],
    isNew: true,
    imageEmoji: "🧊",
    points: 7
  },
  {
    id: "coffee_classic_americano",
    name: "Classic Americano",
    description: "Straightforward. Clean. Caffeinated truth.",
    category: "coffee",
    priceCents: 375,
    tags: ["classic"],
    imageEmoji: "☕️",
    points: 5
  },
  {
    id: "tea_citrus_bloom",
    name: "Citrus Bloom Tea",
    description: "Orange peel, floral notes, and calm energy.",
    category: "tea",
    priceCents: 425,
    tags: ["tea", "bright"],
    imageEmoji: "🍊",
    points: 6
  },
  {
    id: "seasonal_brown_sugar_iced",
    name: "Brown Sugar Iced Espresso",
    description: "Brown sugar warmth with an iced snap. Garden-approved.",
    category: "seasonal",
    priceCents: 595,
    tags: ["seasonal", "iced"],
    imageEmoji: "🪴",
    points: 9
  },
  {
    id: "food_honey_oat_biscuit",
    name: "Honey Oat Biscuit",
    description: "Soft center, crisp edges. Sweet like good timing.",
    category: "food",
    priceCents: 295,
    tags: ["food", "snack"],
    imageEmoji: "🍯",
    points: 4
  },
  {
    id: "food_garden_granola",
    name: "Garden Granola Cup",
    description: "Yogurt, berries, and crunch. The responsible choice (still delicious).",
    category: "food",
    priceCents: 455,
    tags: ["food", "fresh"],
    imageEmoji: "🥣",
    points: 6
  }
];
