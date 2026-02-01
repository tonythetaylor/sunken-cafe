export type ThemeMode = "light" | "dark" | "system";

const KEY = "sunken_theme_mode";

export function getStoredTheme(): ThemeMode {
  const raw = localStorage.getItem(KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return "system";
}

export function setStoredTheme(mode: ThemeMode) {
  localStorage.setItem(KEY, mode);
  applyTheme(mode);
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("dark");

  if (mode === "dark") {
    root.classList.add("dark");
    return;
  }
  if (mode === "light") {
    return;
  }

  // system
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  if (prefersDark) root.classList.add("dark");
}

export function initTheme() {
  const mode = getStoredTheme();
  applyTheme(mode);

  // keep system mode in sync
  const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
  if (!mql) return;

  const handler = () => {
    if (getStoredTheme() === "system") applyTheme("system");
  };

  // modern + fallback
  mql.addEventListener?.("change", handler);
  // @ts-expect-error older safari
  mql.addListener?.(handler);
}
