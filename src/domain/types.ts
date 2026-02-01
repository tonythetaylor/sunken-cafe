export type MenuCategory = "coffee" | "tea" | "seasonal" | "food";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  priceCents: number;
  tags: string[];
  isNew?: boolean;
  imageEmoji?: string; // no backend/images yet - still fun for UI
  points: number; // rewards points per purchase of this item
};

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  priceCents: number;
  qty: number;
  notes?: string;
};

export type CustomDrink = {
  id: string;
  name: string;
  baseItemId: string; // references MenuItem
  tweaks: {
    size: "S" | "M" | "L";
    milk: "none" | "oat" | "almond" | "whole";
    sweetener: "none" | "honey" | "vanilla" | "caramel";
    extraShot: boolean;
    iced: boolean;
  };
  createdAt: number;
};

export type Order = {
  id: string;
  createdAt: number;
  lines: CartLine[];
  totalCents: number;
  earnedPoints: number;
  status: "placed";
};

export type UserProfile = {
  name: string;
  rewardsPoints: number;
};
