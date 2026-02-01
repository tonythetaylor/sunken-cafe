import { NavLink } from "react-router-dom";
import { Home, MenuSquare, ShoppingBag, Receipt, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu", icon: MenuSquare },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/account", label: "Account", icon: User }
] as const;

export function BottomTabs() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t"
      style={{ background: "rgb(var(--panel))", borderColor: "rgba(0,0,0,0.10)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-5 px-2 py-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-xs transition ${
                isActive ? "font-semibold" : ""
              }`
            }
            style={({ isActive }) => ({
              color: isActive ? "rgb(var(--emerald))" : "rgb(var(--muted))",
              background: isActive ? "rgba(var(--emerald),0.08)" : "transparent"
            })}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
