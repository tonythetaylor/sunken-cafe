export type MenuCategory = "coffee" | "tea" | "refresher" | "seasonal" | "food";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  priceCents: number;
  tags: string[];
  isNew?: boolean;
  imageEmoji?: string;
  points: number;
};

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  priceCents: number;
  qty: number;
  notes?: string;
};

export type DrinkKind = "coffee" | "refresher";

export type CupSize = "S" | "M" | "L";
export type MilkOption = "none" | "oat" | "almond" | "whole" | "cream";
export type SweetenerOption = "none" | "sugar" | "honey" | "stevia";

export type SyrupOption =
  | "vanilla"
  | "caramel"
  | "hazelnut"
  | "mocha"
  | "brown_sugar"
  | "lavender";

export type FoamOption =
  | "none"
  | "cold_foam"
  | "vanilla_foam"
  | "salted_caramel_foam";

export type GarnishOption =
  | "none"
  | "cinnamon"
  | "cocoa"
  | "nutmeg"
  | "orange_zest";

export type LiningOption = "none" | "chocolate" | "caramel" | "mocha";

export type RefresherBase = "green_tea" | "lemonade" | "sparkling" | "water";
export type RefresherFlavor =
  | "strawberry"
  | "mango"
  | "peach"
  | "blueberry"
  | "pineapple";

export type CaffeineLevel = "none" | "light" | "regular" | "extra";

export type CoffeeRoast = "blonde" | "medium" | "dark";

export type CustomDrink = {
  id: string;
  name: string;
  kind: DrinkKind;

  /** Optional reference to a menu item (Latte, Cold Brew, Refresher, etc.) */
  baseItemId?: string;

  size: CupSize;

  coffee?: {
    roast: CoffeeRoast;
    flavorNotes: string[]; // freeform notes
    milk: MilkOption;
    sweetener: SweetenerOption;
    syrups: SyrupOption[]; // ✅ includes lavender now
    foam: FoamOption;
    garnish: GarnishOption;
    lining: LiningOption; // ✅ unify name as "lining"
    extraShot: boolean;
    iced: boolean;
  };

  refresher?: {
    base: RefresherBase;
    flavors: RefresherFlavor[]; // mix & match
    caffeine: CaffeineLevel;
    addFruit: boolean;
    addBoba: boolean;
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