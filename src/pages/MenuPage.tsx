import { useMemo, useState } from "react";
import { MENU } from "../data/menu";
import type { MenuCategory } from "../domain/types";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { money } from "../lib/storage";
import { useAppStore } from "../store/useAppStore";

const categories: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "seasonal", label: "Seasonal" },
  { id: "food", label: "Food" }
];

export function MenuPage() {
  const addToCart = useAppStore(s => s.addToCart);
  const saveCustomDrink = useAppStore(s => s.saveCustomDrink);

  const [cat, setCat] = useState<(typeof categories)[number]["id"]>("all");

  const items = useMemo(() => {
    if (cat === "all") return MENU;
    return MENU.filter(m => m.category === cat);
  }, [cat]);

  return (
    <div className="px-4 pb-24 pt-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Menu</h1>
        <Button
          variant="outline"
          onClick={() => {
            // quick custom drink from first coffee item
            const base = MENU.find(m => m.category === "coffee");
            if (!base) return;
            saveCustomDrink({
              name: "My Garden Latte",
              baseItemId: base.id,
              tweaks: { size: "M", milk: "oat", sweetener: "vanilla", extraShot: false, iced: false }
            });
            addToCart(base.id, 1, "Custom: oat milk, vanilla");
          }}
          className="px-3"
        >
          Save + Quick Add
        </Button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="shrink-0 rounded-full border px-3 py-1 text-sm"
            style={{
              borderColor: c.id === cat ? "rgba(var(--emerald),0.55)" : "rgba(0,0,0,0.10)",
              background: c.id === cat ? "rgba(var(--emerald),0.10)" : "transparent",
              color: c.id === cat ? "rgb(var(--emerald))" : "rgb(var(--text))"
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-2 grid gap-3">
        {items.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">{item.imageEmoji ?? "☕️"}</div>
                  <div className="font-semibold">{item.name}</div>
                  {item.isNew && <Badge>NEW</Badge>}
                </div>
                <p className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
                  {item.description}
                </p>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">{money(item.priceCents)}</span>{" "}
                  <span style={{ color: "rgb(var(--muted))" }}>• earns {item.points} pts</span>
                </div>
              </div>

              <Button onClick={() => addToCart(item.id)}>Add</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
