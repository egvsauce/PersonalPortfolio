"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    // Dark mode is intentionally disabled for this site.
    // Keep the theme permanently light and remove any `.dark` class.
    setTheme("light");
    try {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } catch (e) {
      // ignore if window is not available or storage fails
    }
  };

  useEffect(() => {
    // Ensure theme is always light. Clear any stored dark preference and
    // remove the `.dark` class if present.
    try {
      window.localStorage.setItem("theme", "light");
    } catch (e) {}
    document.documentElement.classList.remove("dark");
    setTheme("light");
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}