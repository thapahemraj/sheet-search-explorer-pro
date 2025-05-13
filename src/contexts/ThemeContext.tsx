
import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_THEME } from "@/config/config";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  systemTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  mode: DEFAULT_THEME as ThemeMode,
  setMode: () => {},
  systemTheme: "light"
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>((localStorage.getItem("theme") as ThemeMode) || DEFAULT_THEME as ThemeMode);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Listen for changes in system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply theme based on mode and system preference
    if (mode === "system") {
      root.classList.remove("dark", "light");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("dark", "light");
      root.classList.add(mode);
    }

    // Save preferences
    localStorage.setItem("theme", mode);
  }, [mode, systemTheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
