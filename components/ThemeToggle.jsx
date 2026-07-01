"use client";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const root = typeof document !== "undefined" ? document.documentElement : null;

  const applyTheme = (isDark) => {
    if (!root) return;
    root.classList.toggle("dark", isDark);
    root.style.setProperty("--color-frosty", isDark ? "#000" : "#F0F6FA");
    root.style.setProperty("--color-content", isDark ? "#fff" : "#000");
    root.style.setProperty("--overlay", isDark ? "#fff" : "#000");
    root.style.setProperty("--text-gradient-from", isDark ? "#fff" : "#000");
    root.style.setProperty("--text-gradient-to", isDark ? "#999" : "#555");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && true);
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full transition-colors hover:bg-black/10 dark:hover:bg-overlay/10"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
