import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MENU } from "../data/menu";
import type { MenuCategory, CustomDrink } from "../domain/types";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { money } from "../lib/storage";
import { useAppStore } from "../store/useAppStore";
import { Coffee, Sparkles } from "lucide-react";

const categories: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "seasonal", label: "Seasonal" }, // includes refreshers (tagged)
  { id: "food", label: "Food" }
];

export function MenuPage() {
  const addToCart = useAppStore((s) => s.addToCart);
  const saveCustomDrink = useAppStore((s) => s.saveCustomDrink);
  const addCustomDrinkToCart = useAppStore((s) => s.addCustomDrinkToCart);

  const [cat, setCat] = useState<(typeof categories)[number]["id"]>("all");

  const items = useMemo(() => {
    if (cat === "all") return MENU;
    return MENU.filter((m) => m.category === cat);
  }, [cat]);

  function quickSaveAndAdd() {
    const base = MENU.find((m) => m.category === "coffee");
    if (!base) return;

    const draft: Omit<CustomDrink, "id" | "createdAt"> = {
      name: "My Garden Latte",
      kind: "coffee",
      baseItemId: base.id,
      size: "M",
      coffee: {
        roast: "medium",
        flavorNotes: ["vanilla", "garden-smooth"],
        milk: "oat",
        sweetener: "honey",
        syrups: ["vanilla"],
        foam: "vanilla_foam",
        garnish: "cinnamon",
        lining: "none",
        extraShot: false,
        iced: false
      },
      refresher: undefined
    };

    const saved = saveCustomDrink(draft);
    addCustomDrinkToCart(saved);
  }

  return (
    <div className="px-4 pb-24 pt-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Menu</h1>

        {/* Consistent CTAs */}
        <div className="flex items-center gap-2">
          <Link to="/build" className="block">
            <Button variant="outline" className="h-11 gap-2 whitespace-nowrap">
              <Coffee size={16} />
              Build
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={quickSaveAndAdd}
            className="h-11 gap-2 whitespace-nowrap"
          >
            <Sparkles size={16} style={{ color: "rgb(var(--orange))" }} />
            Quick add
          </Button>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className="shrink-0 rounded-full border px-3 py-1 text-sm"
            style={{
              borderColor:
                c.id === cat ? "rgba(var(--emerald),0.55)" : "rgba(0,0,0,0.10)",
              background: c.id === cat ? "rgba(var(--emerald),0.10)" : "transparent",
              color: c.id === cat ? "rgb(var(--emerald))" : "rgb(var(--text))"
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-2 grid gap-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">{item.imageEmoji ?? "☕️"}</div>
                  <div className="font-semibold">{item.name}</div>
                  {item.isNew && <Badge>NEW</Badge>}
                  {item.tags?.includes("refresher") && <Badge>REFRESHER</Badge>}
                  {item.tags?.includes("vegan") && <Badge>VEGAN</Badge>}
                  {item.tags?.includes("pescatarian") && <Badge>PESC</Badge>}
                  {item.tags?.includes("salad") && <Badge>SALAD</Badge>}
                </div>

                <p className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
                  {item.description}
                </p>

                <div className="mt-2 text-sm">
                  <span className="font-semibold">{money(item.priceCents)}</span>{" "}
                  <span style={{ color: "rgb(var(--muted))" }}>
                    • earns {item.points} pts
                  </span>
                </div>
              </div>

              <Button onClick={() => addToCart(item.id)} className="h-11 px-4 whitespace-nowrap">
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}