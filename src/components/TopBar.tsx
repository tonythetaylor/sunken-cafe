import { Gift, Leaf } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { money } from "../lib/storage";
import { ThemeMenu } from "./ThemeMenu";

export function TopBar() {
  const user = useAppStore(s => s.user);
  const cart = useAppStore(s => s.cart);
  const rewardsPoints = useAppStore(s => s.rewardsPoints);

  const total = cart.reduce((acc, l) => acc + l.priceCents * l.qty, 0);

  return (
    <header className="sticky top-0 z-20 border-b backdrop-blur"
      style={{
        background: "rgba(var(--panel),0.75)",
        borderColor: "rgba(0,0,0,0.08)"
      }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-2xl"
            style={{ background: "rgba(var(--emerald),0.12)" }}
          >
            <Leaf size={18} style={{ color: "rgb(var(--emerald))" }} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{user ? `Hi, ${user.name}` : "Sunken Cafe"}</div>
            <div className="text-xs" style={{ color: "rgb(var(--muted))" }}>
              {cart.length ? `${money(total)} in cart` : "Coffee shop in a garden"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border px-3 py-2 text-xs"
            style={{ borderColor: "rgba(var(--emerald),0.30)" }}
            title="Rewards points"
          >
            <Gift size={14} style={{ color: "rgb(var(--orange))" }} />
            <span className="font-semibold">{rewardsPoints}</span>
            <span style={{ color: "rgb(var(--muted))" }}>pts</span>
          </div>
          <ThemeMenu />
        </div>
      </div>
    </header>
  );
}
