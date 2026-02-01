import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

  const styles: Record<Variant, string> = {
    primary:
      "text-[rgb(var(--panel))] shadow-sm",
    ghost:
      "bg-transparent hover:bg-[rgba(var(--emerald),0.10)]",
    outline:
      "border hover:bg-[rgba(var(--emerald),0.06)]"
  };

  const inline =
    variant === "primary"
      ? { background: "rgb(var(--emerald))" }
      : variant === "outline"
      ? { borderColor: "rgba(var(--emerald),0.35)" }
      : undefined;

  return <button {...props} style={inline} className={`${base} ${styles[variant]} ${className}`} />;
}
