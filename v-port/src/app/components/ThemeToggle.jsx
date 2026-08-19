"use client";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  if (isDark === null) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg hover:border-fg-muted"
    >
      {isDark ? <SunIcon className="h-3.5 w-3.5" /> : <MoonIcon className="h-3.5 w-3.5" />}
    </button>
  );
};

export default ThemeToggle;
