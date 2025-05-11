
import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_THEME } from "@/config/config";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: DEFAULT_THEME as ThemeMode,
  setMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>((localStorage.getItem("theme") as ThemeMode) || DEFAULT_THEME as ThemeMode);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle system preference
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    
    // Apply theme
    if (mode === "system") {
      root.classList.remove("dark", "light");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("dark", "light");
      root.classList.add(mode);
    }

    // Save preferences
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
