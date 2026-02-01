import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 ${props.className ?? ""}`}
      style={{
        background: "rgba(var(--panel), 1)",
        borderColor: "rgba(0,0,0,0.10)",
        boxShadow: "none",
        // ring uses --ring
      }}
    />
  );
}
