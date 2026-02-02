import { create } from "zustand";
import type { CartLine, CustomDrink, Order, UserProfile } from "../domain/types";
import { safeJsonParse, uid } from "../lib/storage";
import { MENU } from "../data/menu";
import { formatDrinkNotes, priceCustomDrinkCents } from "../lib/drinkFormat";

type AppState = {
  user: UserProfile | null;
  cart: CartLine[];
  customDrinks: CustomDrink[];
  orders: Order[];

  // derived-ish
  rewardsPoints: number;

  // actions
  loginMock: (name: string) => void;
  logout: () => void;

  addToCart: (itemId: string, qty?: number, notes?: string) => void;
  removeLine: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clearCart: () => void;

  addCustomDrinkToCart: (drink: CustomDrink) => void;
  saveCustomDrink: (drink: Omit<CustomDrink, "id" | "createdAt">) => CustomDrink;
  deleteCustomDrink: (id: string) => void;
  reorder: (orderId: string) => void;

  checkout: () => { ok: boolean; error?: string; orderId?: string };
};

const KEY = "sunken_cafe_state_v1";

type Persisted = {
  user: UserProfile | null;
  cart: CartLine[];
  customDrinks: CustomDrink[];
  orders: Order[];
};

function load(): Persisted {
  const fallback: Persisted = { user: null, cart: [], customDrinks: [], orders: [] };
  return safeJsonParse(localStorage.getItem(KEY), fallback);
}

function save(p: Persisted) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

function computeRewards(user: UserProfile | null) {
  return user?.rewardsPoints ?? 0;
}

function computeEarnedPoints(lines: CartLine[]) {
  let pts = 0;
  for (const l of lines) {
    const item = MENU.find(m => m.id === l.itemId);
    if (!item) continue;
    pts += item.points * l.qty;
  }
  return pts;
}

function computeTotal(lines: CartLine[]) {
  return lines.reduce((acc, l) => acc + l.priceCents * l.qty, 0);
}

export const useAppStore = create<AppState>((set, get) => {
  const initial = load();

  return {
    user: initial.user,
    cart: initial.cart,
    customDrinks: initial.customDrinks,
    orders: initial.orders,

    rewardsPoints: computeRewards(initial.user),

    loginMock: (name) => {
      const user: UserProfile = { name, rewardsPoints: 0 };
      const next: Persisted = { ...load(), user };
      save(next);
      set({ user, rewardsPoints: user.rewardsPoints });
    },

    logout: () => {
      const next: Persisted = { ...load(), user: null };
      save(next);
      set({ user: null, rewardsPoints: 0 });
    },

    addToCart: (itemId, qty = 1, notes) => {
      const item = MENU.find(m => m.id === itemId);
      if (!item) return;

      const line: CartLine = {
        lineId: uid("line"),
        itemId,
        name: item.name,
        priceCents: item.priceCents,
        qty,
        notes
      };

      const cart = [...get().cart, line];
      const persisted = load();
      const next: Persisted = { ...persisted, cart };
      save(next);
      set({ cart });
    },

    removeLine: (lineId) => {
      const cart = get().cart.filter(l => l.lineId !== lineId);
      const next: Persisted = { ...load(), cart };
      save(next);
      set({ cart });
    },

    setQty: (lineId, qty) => {
      const q = Math.max(1, Math.min(99, qty));
      const cart = get().cart.map(l => (l.lineId === lineId ? { ...l, qty: q } : l));
      const next: Persisted = { ...load(), cart };
      save(next);
      set({ cart });
    },

    clearCart: () => {
      const next: Persisted = { ...load(), cart: [] };
      save(next);
      set({ cart: [] });
    },

    addCustomDrinkToCart: (drink) => {
      // price from your simple rules (no backend yet)
      const priceCents = priceCustomDrinkCents(drink);

      const line: CartLine = {
        lineId: uid("line"),
        itemId: `custom:${drink.id}`,
        name: drink.name,
        priceCents,
        qty: 1,
        notes: formatDrinkNotes(drink)
      };

      const cart = [...get().cart, line];
      const next: Persisted = { ...load(), cart };
      save(next);
      set({ cart });
    },

    saveCustomDrink: (drink) => {
      const full: CustomDrink = { ...drink, id: uid("custom"), createdAt: Date.now() };
      const customDrinks = [full, ...get().customDrinks];
      const next: Persisted = { ...load(), customDrinks };
      save(next);
      set({ customDrinks });
      return full;
    },

    deleteCustomDrink: (id) => {
      const customDrinks = get().customDrinks.filter(d => d.id !== id);
      const next: Persisted = { ...load(), customDrinks };
      save(next);
      set({ customDrinks });
    },

    reorder: (orderId) => {
      const order = get().orders.find(o => o.id === orderId);
      if (!order) return;
      const cart = order.lines.map(l => ({ ...l, lineId: uid("line") }));
      const next: Persisted = { ...load(), cart };
      save(next);
      set({ cart });
    },

    checkout: () => {
      const { cart, user } = get();
      if (cart.length === 0) return { ok: false, error: "Cart is empty." };

      const totalCents = computeTotal(cart);
      const earnedPoints = computeEarnedPoints(cart);
      const id = uid("order");

      const order: Order = {
        id,
        createdAt: Date.now(),
        lines: cart,
        totalCents,
        earnedPoints,
        status: "placed"
      };

      const orders = [order, ...get().orders];

      const nextUser = user ? { ...user, rewardsPoints: user.rewardsPoints + earnedPoints } : null;

      const nextPersisted: Persisted = {
        user: nextUser,
        cart: [],
        customDrinks: get().customDrinks,
        orders
      };

      save(nextPersisted);

      set({
        orders,
        cart: [],
        user: nextUser,
        rewardsPoints: computeRewards(nextUser)
      });

      return { ok: true, orderId: id };
    }
  };
});
