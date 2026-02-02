import { useMemo, useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { INVENTORY } from "../data/inventory";
import type {
  CustomDrink,
  DrinkKind,
  CupSize,
  SyrupOption,
  RefresherFlavor
} from "../domain/types";
import { uid } from "../lib/storage";
import { useAppStore } from "../store/useAppStore";
import { formatDrinkNotes, priceCustomDrinkCents } from "../lib/drinkFormat";

function TogglePills<T extends string>({
  label,
  values,
  active,
  setActive,
  inStock
}: {
  label: string;
  values: T[];
  active: T;
  setActive: (v: T) => void;
  inStock: Record<T, boolean>;
}) {
  return (
    <div className="mt-3">
      <div className="text-xs font-semibold" style={{ color: "rgb(var(--muted))" }}>
        {label}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map(v => {
          const ok = inStock[v];
          const isOn = active === v;
          return (
            <button
              key={v}
              disabled={!ok}
              onClick={() => setActive(v)}
              className="rounded-full border px-3 py-1 text-sm disabled:opacity-40"
              style={{
                borderColor: isOn ? "rgba(var(--emerald),0.60)" : "rgba(0,0,0,0.10)",
                background: isOn ? "rgba(var(--emerald),0.10)" : "transparent",
                color: isOn ? "rgb(var(--emerald))" : "rgb(var(--text))"
              }}
              title={!ok ? "Out of stock" : ""}
            >
              {v.replaceAll("_", " ")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MultiSelectPills<T extends string>({
  label,
  values,
  selected,
  setSelected,
  inStock,
  max = 4
}: {
  label: string;
  values: T[];
  selected: T[];
  setSelected: (v: T[]) => void;
  inStock: Record<T, boolean>;
  max?: number;
}) {
  function toggle(v: T) {
    if (selected.includes(v)) setSelected(selected.filter(x => x !== v));
    else {
      if (selected.length >= max) return;
      setSelected([...selected, v]);
    }
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold" style={{ color: "rgb(var(--muted))" }}>
          {label}
        </div>
        <div className="text-xs" style={{ color: "rgb(var(--muted))" }}>
          {selected.length}/{max}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {values.map(v => {
          const ok = inStock[v];
          const isOn = selected.includes(v);
          return (
            <button
              key={v}
              disabled={!ok}
              onClick={() => ok && toggle(v)}
              className="rounded-full border px-3 py-1 text-sm disabled:opacity-40"
              style={{
                borderColor: isOn ? "rgba(var(--emerald),0.60)" : "rgba(0,0,0,0.10)",
                background: isOn ? "rgba(var(--emerald),0.10)" : "transparent",
                color: isOn ? "rgb(var(--emerald))" : "rgb(var(--text))"
              }}
              title={!ok ? "Out of stock" : ""}
            >
              {v.replaceAll("_", " ")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BuildCupPage() {
  const saveCustomDrink = useAppStore(s => s.saveCustomDrink);
  const addCustomDrinkToCart = useAppStore(s => s.addCustomDrinkToCart);

  const [kind, setKind] = useState<DrinkKind>("coffee");
  const [name, setName] = useState("My Custom Drink");
  const [size, setSize] = useState<CupSize>("M");

  // coffee state
  const [roast, setRoast] = useState<"blonde" | "medium" | "dark">("medium");
  const [iced, setIced] = useState(true);
  const [milk, setMilk] = useState<"none" | "oat" | "almond" | "whole" | "cream">("oat");
  const [sweetener, setSweetener] = useState<"none" | "sugar" | "honey" | "stevia">("none");
  const [syrups, setSyrups] = useState<SyrupOption[]>(["vanilla"]);
  const [foam, setFoam] = useState<"none" | "cold_foam" | "vanilla_foam" | "salted_caramel_foam">("none");
  const [garnish, setGarnish] = useState<"none" | "cinnamon" | "cocoa" | "nutmeg" | "orange_zest">("none");
  const [lining, setLining] = useState<"none" | "chocolate" | "caramel" | "mocha">("none");
  const [extraShot, setExtraShot] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);

  // refresher state
  const [refBase, setRefBase] = useState<"green_tea" | "lemonade" | "sparkling" | "water">("lemonade");
  const [refFlavors, setRefFlavors] = useState<RefresherFlavor[]>(["strawberry"]);
  const [caffeine, setCaffeine] = useState<"none" | "light" | "regular" | "extra">("regular");
  const [addFruit, setAddFruit] = useState(true);
  const [addBoba, setAddBoba] = useState(false);
  const [refIced, setRefIced] = useState(true);

  const drink: CustomDrink = useMemo(() => {
    const id = uid("custom_tmp"); // temp id for preview
    if (kind === "coffee") {
      return {
        id,
        name,
        kind,
        size,
        createdAt: Date.now(),
        coffee: {
          roast,
          flavorNotes: notes,
          milk,
          sweetener,
          syrups,
          foam,
          garnish,
          lining,
          extraShot,
          iced
        }
      };
    }

    return {
      id,
      name,
      kind,
      size,
      createdAt: Date.now(),
      refresher: {
        base: refBase,
        flavors: refFlavors,
        caffeine,
        addFruit,
        addBoba,
        iced: refIced
      }
    };
  }, [
    kind, name, size,
    roast, iced, milk, sweetener, syrups, foam, garnish, lining, extraShot, notes,
    refBase, refFlavors, caffeine, addFruit, addBoba, refIced
  ]);

  const preview = formatDrinkNotes(drink);
  const price = priceCustomDrinkCents(drink);

  function persistAndAdd() {
    // Create a real persistent CustomDrink object
    const persistent: Omit<CustomDrink, "id" | "createdAt"> =
      kind === "coffee"
        ? {
            name,
            kind,
            size,
            coffee: {
              roast,
              flavorNotes: notes,
              milk,
              sweetener,
              syrups,
              foam,
              garnish,
              lining,
              extraShot,
              iced
            }
          }
        : {
            name,
            kind,
            size,
            refresher: {
              base: refBase,
              flavors: refFlavors,
              caffeine,
              addFruit,
              addBoba,
              iced: refIced
            }
          };

    // Save + also add to cart
    // your store saves with id/createdAt
    saveCustomDrink(persistent as any);

    // We can’t know the id that saveCustomDrink generated without returning it.
    // Simple approach: add a "preview" cart line with details now, and the saved drink will appear in “Saved Drinks” later.
    addCustomDrinkToCart({
      ...(persistent as any),
      id: uid("custom"),
      createdAt: Date.now()
    });
  }

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-lg font-semibold">Build Your Cup</h1>

      <Card className="mt-3 p-4">
        <div className="text-xs font-semibold" style={{ color: "rgb(var(--muted))" }}>
          Drink name
        </div>
        <div className="mt-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name your drink" />
        </div>

        <TogglePills
          label="Type"
          values={["coffee", "refresher"]}
          active={kind}
          setActive={(v) => setKind(v as DrinkKind)}
          inStock={{ coffee: true, refresher: true }}
        />

        <TogglePills
          label="Cup size"
          values={["S", "M", "L"]}
          active={size}
          setActive={setSize}
          inStock={INVENTORY.cupSizes}
        />
      </Card>

      {kind === "coffee" ? (
        <Card className="mt-3 p-4">
          <TogglePills
            label="Roast"
            values={["blonde", "medium", "dark"]}
            active={roast}
            setActive={setRoast}
            inStock={INVENTORY.coffee.roasts}
          />

          <TogglePills
            label="Hot or iced"
            values={["iced", "hot"]}
            active={iced ? "iced" : "hot"}
            setActive={(v) => setIced(v === "iced")}
            inStock={{ iced: INVENTORY.coffee.iced, hot: true }}
          />

          <TogglePills
            label="Milk / cream"
            values={["none", "oat", "almond", "whole", "cream"]}
            active={milk}
            setActive={setMilk}
            inStock={INVENTORY.coffee.milks}
          />

          <TogglePills
            label="Sweetener"
            values={["none", "sugar", "honey", "stevia"]}
            active={sweetener}
            setActive={setSweetener}
            inStock={INVENTORY.coffee.sweeteners}
          />

          <MultiSelectPills
            label="Syrups"
            values={["vanilla", "caramel", "hazelnut", "mocha", "brown_sugar", "lavender"]}
            selected={syrups}
            setSelected={setSyrups}
            inStock={INVENTORY.coffee.syrups}
            max={4}
          />

          <TogglePills
            label="Cold foam"
            values={["none", "cold_foam", "vanilla_foam", "salted_caramel_foam"]}
            active={foam}
            setActive={setFoam}
            inStock={INVENTORY.coffee.foams}
          />

          <TogglePills
            label="Line the cup"
            values={["none", "chocolate", "caramel", "mocha"]}
            active={lining}
            setActive={setLining}
            inStock={INVENTORY.coffee.linings}
          />

          <TogglePills
            label="Garnish"
            values={["none", "cinnamon", "cocoa", "nutmeg", "orange_zest"]}
            active={garnish}
            setActive={setGarnish}
            inStock={INVENTORY.coffee.garnishes}
          />

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border px-3 py-3"
            style={{ borderColor: "rgba(0,0,0,0.10)" }}
          >
            <div>
              <div className="text-sm font-semibold">Extra espresso shot</div>
              <div className="text-xs" style={{ color: "rgb(var(--muted))" }}>Adds caffeine + cost</div>
            </div>
            <button
              disabled={!INVENTORY.coffee.extraShot}
              onClick={() => setExtraShot(v => !v)}
              className="h-9 w-14 rounded-full border"
              style={{
                borderColor: "rgba(0,0,0,0.12)",
                background: extraShot ? "rgba(var(--emerald),0.18)" : "transparent"
              }}
              title={!INVENTORY.coffee.extraShot ? "Out of stock" : ""}
            >
              <div
                className="h-7 w-7 rounded-full"
                style={{
                  background: extraShot ? "rgb(var(--emerald))" : "rgba(0,0,0,0.20)",
                  transform: `translateX(${extraShot ? 20 : 0}px)`,
                  transition: "transform 120ms ease"
                }}
              />
            </button>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold" style={{ color: "rgb(var(--muted))" }}>
              Flavor notes (optional)
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="e.g. 'more vanilla', 'extra strong'"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.currentTarget.value || "").trim();
                    if (!value) return;
                    setNotes([...notes, value]);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
            {notes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {notes.map((n, idx) => (
                  <button
                    key={`${n}-${idx}`}
                    onClick={() => setNotes(notes.filter((_, i) => i !== idx))}
                    className="rounded-full border px-3 py-1 text-xs"
                    style={{ borderColor: "rgba(var(--emerald),0.30)", background: "rgba(var(--emerald),0.06)" }}
                    title="Remove"
                  >
                    {n} ✕
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="mt-3 p-4">
          <TogglePills
            label="Base"
            values={["green_tea", "lemonade", "sparkling", "water"]}
            active={refBase}
            setActive={setRefBase}
            inStock={INVENTORY.refresher.bases}
          />

          <MultiSelectPills
            label="Flavors (mix + match)"
            values={["strawberry", "mango", "peach", "blueberry", "pineapple"]}
            selected={refFlavors}
            setSelected={setRefFlavors}
            inStock={INVENTORY.refresher.flavors}
            max={3}
          />

          <TogglePills
            label="Caffeine level"
            values={["none", "light", "regular", "extra"]}
            active={caffeine}
            setActive={setCaffeine}
            inStock={INVENTORY.refresher.caffeine}
          />

          <TogglePills
            label="Ice"
            values={["iced", "no_ice"]}
            active={refIced ? "iced" : "no_ice"}
            setActive={(v) => setRefIced(v === "iced")}
            inStock={{ iced: INVENTORY.refresher.iced, no_ice: true }}
          />

          <div className="mt-4 grid gap-3">
            <label className="flex items-center justify-between rounded-xl border px-3 py-3"
              style={{ borderColor: "rgba(0,0,0,0.10)" }}
            >
              <div>
                <div className="text-sm font-semibold">Add fruit</div>
                <div className="text-xs" style={{ color: "rgb(var(--muted))" }}>Fresh add-in</div>
              </div>
              <input
                type="checkbox"
                checked={addFruit}
                disabled={!INVENTORY.refresher.addFruit}
                onChange={() => setAddFruit(v => !v)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border px-3 py-3"
              style={{ borderColor: "rgba(0,0,0,0.10)" }}
            >
              <div>
                <div className="text-sm font-semibold">Add boba</div>
                <div className="text-xs" style={{ color: "rgb(var(--muted))" }}>
                  Out of stock disables this
                </div>
              </div>
              <input
                type="checkbox"
                checked={addBoba}
                disabled={!INVENTORY.refresher.addBoba}
                onChange={() => setAddBoba(v => !v)}
              />
            </label>
          </div>
        </Card>
      )}

      <Card className="mt-3 p-4">
        <div className="text-xs font-semibold" style={{ color: "rgb(var(--muted))" }}>
          Preview (what gets stored + added to order)
        </div>
        <div className="mt-2 text-sm">{preview}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm" style={{ color: "rgb(var(--muted))" }}>Est. price</div>
          <div className="text-lg font-semibold">${(price / 100).toFixed(2)}</div>
        </div>

        <Button className="mt-3 w-full" onClick={persistAndAdd}>
          Save & Add to Cart
        </Button>
      </Card>
    </div>
  );
}