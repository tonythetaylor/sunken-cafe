import type {
  CupSize,
  MilkOption,
  SweetenerOption,
  SyrupOption,
  FoamOption,
  GarnishOption,
  LiningOption,
  RefresherBase,
  RefresherFlavor,
  CaffeineLevel
} from "../domain/types";

export type Inventory = {
  cupSizes: Record<CupSize, boolean>;

  coffee: {
    roasts: Record<"blonde" | "medium" | "dark", boolean>;
    milks: Record<MilkOption, boolean>;
    sweeteners: Record<SweetenerOption, boolean>;
    syrups: Record<SyrupOption, boolean>;
    foams: Record<FoamOption, boolean>;
    garnishes: Record<GarnishOption, boolean>;
    linings: Record<LiningOption, boolean>;
    extraShot: boolean;
    iced: boolean;
  };

  refresher: {
    bases: Record<RefresherBase, boolean>;
    flavors: Record<RefresherFlavor, boolean>;
    caffeine: Record<CaffeineLevel, boolean>;
    addFruit: boolean;
    addBoba: boolean;
    iced: boolean;
  };
};

// Demo inventory (toggle to simulate out-of-stock)
export const INVENTORY: Inventory = {
  cupSizes: { S: true, M: true, L: true },

  coffee: {
    roasts: { blonde: true, medium: true, dark: true },
    milks: { none: true, oat: true, almond: true, whole: true, cream: true },
    sweeteners: { none: true, sugar: true, honey: true, stevia: false }, // out of stock
    syrups: {
      vanilla: true,
      caramel: true,
      hazelnut: true,
      mocha: true,
      brown_sugar: true,
      lavender: false // out of stock
    },
    foams: { none: true, cold_foam: true, vanilla_foam: true, salted_caramel_foam: false },
    garnishes: { none: true, cinnamon: true, cocoa: true, nutmeg: true, orange_zest: true },
    linings: { none: true, chocolate: true, caramel: true, mocha: true },
    extraShot: true,
    iced: true
  },

  refresher: {
    bases: { green_tea: true, lemonade: true, sparkling: true, water: true },
    flavors: { strawberry: true, mango: true, peach: true, blueberry: true, pineapple: false },
    caffeine: { none: true, light: true, regular: true, extra: true },
    addFruit: true,
    addBoba: false, // out of stock
    iced: true
  }
};