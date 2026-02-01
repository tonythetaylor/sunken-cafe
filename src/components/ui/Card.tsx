import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border shadow-sm ${className}`}
      style={{
        background: "rgb(var(--panel))",
        borderColor: "rgba(0,0,0,0.08)"
      }}
    >
      {children}
    </div>
  );
}
