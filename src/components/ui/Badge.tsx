import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
      style={{
        borderColor: "rgba(var(--emerald),0.35)",
        background: "rgba(var(--emerald),0.08)"
      }}
    >
      {children}
    </span>
  );
}
