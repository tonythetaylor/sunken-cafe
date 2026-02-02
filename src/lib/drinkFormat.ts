import type { CustomDrink } from "../domain/types";

export function formatDrinkNotes(d: CustomDrink): string {
  const size = `Size ${d.size}`;

  if (d.kind === "coffee" && d.coffee) {
    const c = d.coffee;

    return [
      size,
      c.iced ? "Iced" : "Hot",
      `${c.roast} roast`,
      c.milk !== "none" ? `Milk: ${c.milk}` : null,
      c.sweetener !== "none" ? `Sweetener: ${c.sweetener}` : null,
      c.syrups.length ? `Syrups: ${c.syrups.join(", ")}` : null,
      c.foam !== "none" ? `Foam: ${c.foam}` : null,
      c.lining !== "none" ? `Lined: ${c.lining}` : null,
      c.garnish !== "none" ? `Top: ${c.garnish}` : null,
      c.extraShot ? "Extra shot" : null,
      c.flavorNotes.length ? `Notes: ${c.flavorNotes.join(" | ")}` : null
    ]
      .filter(Boolean)
      .join(" • ");
  }

  if (d.kind === "refresher" && d.refresher) {
    const r = d.refresher;

    return [
      size,
      r.iced ? "Iced" : "No ice",
      `Base: ${r.base}`,
      r.flavors.length ? `Flavors: ${r.flavors.join(" + ")}` : null,
      `Caffeine: ${r.caffeine}`,
      r.addFruit ? "Add fruit" : null,
      r.addBoba ? "Add boba" : null
    ]
      .filter(Boolean)
      .join(" • ");
  }

  return size;
}

// Simple demo pricing model (tweak anytime)
export function priceCustomDrinkCents(d: CustomDrink): number {
  const mult = d.size === "S" ? 1 : d.size === "M" ? 1.15 : 1.3;

  let base = d.kind === "coffee" ? 475 : 450;

  if (d.kind === "coffee" && d.coffee) {
    base += d.coffee.syrups.length * 25;
    if (d.coffee.foam !== "none") base += 75;
    if (d.coffee.lining !== "none") base += 50;
    if (d.coffee.extraShot) base += 100;
  }

  if (d.kind === "refresher" && d.refresher) {
    base += Math.max(0, d.refresher.flavors.length - 1) * 25;
    if (d.refresher.caffeine === "extra") base += 100;
    if (d.refresher.addFruit) base += 50;
    if (d.refresher.addBoba) base += 100;
  }

  return Math.round(base * mult);
}