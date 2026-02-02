import type { MenuItem } from "../domain/types";

export const MENU: MenuItem[] = [
  // -------------------------
  // COFFEE
  // -------------------------
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
    id: "coffee_honey_lavender_latte",
    name: "Honey Lavender Latte",
    description: "Floral-lush, gently sweet, and dangerously smooth.",
    category: "coffee",
    priceCents: 625,
    tags: ["signature", "floral"],
    imageEmoji: "🍯",
    points: 9
  },
  {
    id: "coffee_espresso_tonic",
    name: "Espresso Tonic",
    description: "Bright tonic + espresso. Crisp, citrusy, and weirdly perfect.",
    category: "coffee",
    priceCents: 525,
    tags: ["iced", "bright"],
    imageEmoji: "🍋",
    points: 7
  },
  {
    id: "coffee_oat_mocha",
    name: "Oat Milk Mocha",
    description: "Chocolate depth with oat creaminess. Cozy without the crash.",
    category: "coffee",
    priceCents: 595,
    tags: ["dairy-free", "cozy"],
    imageEmoji: "🍫",
    points: 8
  },
  {
    id: "coffee_vietnamese_iced",
    name: "Vietnamese Iced Coffee",
    description: "Sweet condensed milk and strong coffee. A classic for a reason.",
    category: "coffee",
    priceCents: 575,
    tags: ["iced", "sweet", "strong"],
    imageEmoji: "🧋",
    points: 8
  },
  {
    id: "coffee_cafe_au_lait",
    name: "Cafe au Lait",
    description: "Half brewed coffee, half steamed milk. Soft power.",
    category: "coffee",
    priceCents: 475,
    tags: ["classic", "smooth"],
    imageEmoji: "🥛",
    points: 6
  },

  // -------------------------
  // TEA
  // -------------------------
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
    id: "tea_hibiscus_mint",
    name: "Hibiscus Mint Iced Tea",
    description: "Ruby hibiscus, garden mint, and a clean finish.",
    category: "tea",
    priceCents: 450,
    tags: ["iced", "caffeine-free", "bright"],
    imageEmoji: "🌺",
    points: 6
  },
  {
    id: "tea_earl_grey_vanilla",
    name: "Vanilla Earl Grey",
    description: "Bergamot elegance with a warm vanilla edge.",
    category: "tea",
    priceCents: 425,
    tags: ["classic", "aromatic"],
    imageEmoji: "🫖",
    points: 6
  },
  {
    id: "tea_matcha_oat",
    name: "Oat Matcha Latte",
    description: "Stone-ground matcha, oat milk, steady focus.",
    category: "tea",
    priceCents: 625,
    tags: ["signature", "dairy-free"],
    imageEmoji: "🍵",
    points: 9
  },
  {
    id: "tea_chai_spice",
    name: "Chai Spice Latte",
    description: "Warm spice, cozy heat. Like a sweater for your brain.",
    category: "tea",
    priceCents: 595,
    tags: ["spiced", "cozy"],
    imageEmoji: "✨",
    points: 8
  },

  // -------------------------
  // SEASONAL (includes refreshers & specials)
  // -------------------------
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
    id: "seasonal_strawberry_lemon_refresher",
    name: "Strawberry Lemon Refresher",
    description: "Bright lemonade, strawberry, and a little sparkle.",
    category: "seasonal",
    priceCents: 495,
    tags: ["refresher", "citrus", "iced"],
    isNew: true,
    imageEmoji: "🍓",
    points: 7
  },
  {
    id: "seasonal_mango_green_tea_refresher",
    name: "Mango Green Tea Refresher",
    description: "Green tea + mango. Crisp, light, and addictive.",
    category: "seasonal",
    priceCents: 495,
    tags: ["refresher", "tea-based", "iced"],
    imageEmoji: "🥭",
    points: 7
  },
  {
    id: "seasonal_blueberry_basil_sparkler",
    name: "Blueberry Basil Sparkler",
    description: "Blueberry + basil + bubbles. Garden party in a cup.",
    category: "seasonal",
    priceCents: 525,
    tags: ["refresher", "sparkling", "botanical"],
    imageEmoji: "🫐",
    points: 8
  },
  {
    id: "seasonal_peach_ginger_cooler",
    name: "Peach Ginger Cooler",
    description: "Peach sweetness with a ginger kick. Sunny with boundaries.",
    category: "seasonal",
    priceCents: 525,
    tags: ["refresher", "spiced", "iced"],
    imageEmoji: "🍑",
    points: 8
  },

  // -------------------------
  // FOOD (soulful cafe + vegan/pesc + salads)
  // -------------------------
  {
    id: "food_honey_oat_biscuit",
    name: "Honey Oat Biscuit",
    description: "Soft center, crisp edges. Sweet like good timing.",
    category: "food",
    priceCents: 295,
    tags: ["snack", "bakery"],
    imageEmoji: "🍯",
    points: 4
  },
  {
    id: "food_garden_granola",
    name: "Garden Granola Cup",
    description: "Yogurt, berries, and crunch. The responsible choice (still delicious).",
    category: "food",
    priceCents: 455,
    tags: ["fresh", "breakfast"],
    imageEmoji: "🥣",
    points: 6
  },

  // Soulful classics (cafe style)
  {
    id: "food_chicken_waffles",
    name: "Chicken & Waffles",
    description: "Crispy chicken, fluffy waffle, maple heat drizzle.",
    category: "food",
    priceCents: 1195,
    tags: ["signature", "comfort"],
    isNew: true,
    imageEmoji: "🧇",
    points: 12
  },
  {
    id: "food_cheesy_grits_bowl",
    name: "Cheesy Grits Bowl",
    description: "Stone-ground grits, sharp cheddar, scallion, and butter love.",
    category: "food",
    priceCents: 795,
    tags: ["comfort", "breakfast"],
    imageEmoji: "🥣",
    points: 9
  },
  {
    id: "food_oxtail_breakfast_hash",
    name: "Oxtail Breakfast Hash",
    description: "Slow-braised oxtail over potatoes with peppers and onion.",
    category: "food",
    priceCents: 1495,
    tags: ["hearty", "signature"],
    imageEmoji: "🍲",
    points: 14
  },

  // Pescatarian
  {
    id: "food_salmon_grits",
    name: "Salmon + Grits",
    description: "Seared salmon, lemon herb, over creamy grits.",
    category: "food",
    priceCents: 1395,
    tags: ["pescatarian", "hearty"],
    imageEmoji: "🐟",
    points: 13
  },
  {
    id: "food_tuna_melt",
    name: "Garden Tuna Melt",
    description: "Classic tuna melt with herbs, tomato, and cheddar on toasted bread.",
    category: "food",
    priceCents: 995,
    tags: ["pescatarian", "sandwich"],
    imageEmoji: "🥪",
    points: 10
  },

  // Vegan
  {
    id: "food_vegan_breakfast_sandwich",
    name: "Vegan Breakfast Sandwich",
    description: "Plant-based patty, avocado, tomato, and arugula on toasted bun.",
    category: "food",
    priceCents: 975,
    tags: ["vegan", "savory"],
    imageEmoji: "🥑",
    points: 10
  },
  {
    id: "food_chickpea_salad_wrap",
    name: "Chickpea Salad Wrap",
    description: "Herby chickpea salad, crunch greens, and lemon tahini.",
    category: "food",
    priceCents: 895,
    tags: ["vegan", "fresh"],
    imageEmoji: "🌯",
    points: 9
  },

  // Salads
  {
    id: "food_spring_mix_salad",
    name: "Spring Mix Salad",
    description: "Greens, cucumber, tomato, pickled onion, citrus vinaigrette.",
    category: "food",
    priceCents: 795,
    tags: ["salad", "fresh"],
    imageEmoji: "🥗",
    points: 8
  },
  {
    id: "food_kale_caesar",
    name: "Kale Caesar",
    description: "Kale, parmesan, crunch crumbs, lemony caesar dressing.",
    category: "food",
    priceCents: 895,
    tags: ["salad", "classic"],
    imageEmoji: "🥬",
    points: 9
  },
  {
    id: "food_salmon_garden_salad",
    name: "Salmon Garden Salad",
    description: "Greens, seasonal veg, seared salmon, citrus herb dressing.",
    category: "food",
    priceCents: 1295,
    tags: ["salad", "pescatarian"],
    imageEmoji: "🥗",
    points: 12
  }
];