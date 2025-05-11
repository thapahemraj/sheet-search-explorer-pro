
import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_THEME, DEFAULT_COLOR } from "@/config/config";

type ThemeMode = "light" | "dark" | "system";
type ColorTheme = "blue" | "green" | "red" | "black" | "white";

interface ThemeContextType {
  mode: ThemeMode;
  colorTheme: ColorTheme;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (color: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: DEFAULT_THEME as ThemeMode,
  colorTheme: DEFAULT_COLOR as ColorTheme,
  setMode: () => {},
  setColorTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>((localStorage.getItem("theme") as ThemeMode) || DEFAULT_THEME as ThemeMode);
  const [colorTheme, setColorTheme] = useState<ColorTheme>((localStorage.getItem("colorTheme") as ColorTheme) || DEFAULT_COLOR as ColorTheme);

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

    // Apply color theme
    root.classList.remove("theme-blue", "theme-green", "theme-red", "theme-black", "theme-white");
    if (colorTheme !== "blue") {
      root.classList.add(`theme-${colorTheme}`);
    }

    // Save preferences
    localStorage.setItem("theme", mode);
    localStorage.setItem("colorTheme", colorTheme);
  }, [mode, colorTheme]);

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, setMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
