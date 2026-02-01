import { Monitor, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import { getStoredTheme, setStoredTheme, type ThemeMode } from "../theme/theme";
import { Button } from "./ui/Button";

export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const current = useMemo(() => getStoredTheme(), []);

  const items: { mode: ThemeMode; label: string; icon: any }[] = [
    { mode: "light", label: "Light", icon: Sun },
    { mode: "dark", label: "Dark", icon: Moon },
    { mode: "system", label: "System", icon: Monitor }
  ];

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setOpen(v => !v)} className="px-3">
        <Sun size={16} />
        <span className="hidden sm:inline">Theme</span>
      </Button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border shadow-sm"
          style={{ background: "rgb(var(--panel))", borderColor: "rgba(0,0,0,0.10)" }}
        >
          {items.map(({ mode, label, icon: Icon }) => (
            <button
              key={mode}
              onClick={() => {
                setStoredTheme(mode);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[rgba(var(--emerald),0.08)]"
              style={{
                color: current === mode ? "rgb(var(--emerald))" : "rgb(var(--text))"
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
