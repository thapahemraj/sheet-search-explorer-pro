
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeSwitcher: React.FC = () => {
  const { mode, colorTheme, setMode, setColorTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 px-0">
          {mode === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">{t("theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setMode("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>{t("lightMode")}</span>
            {mode === "light" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>{t("darkMode")}</span>
            {mode === "dark" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMode("system")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>{t("systemMode")}</span>
            {mode === "system" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setColorTheme("blue")}>
            <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
            <span>{t("blue")}</span>
            {colorTheme === "blue" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("green")}>
            <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
            <span>{t("green")}</span>
            {colorTheme === "green" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("red")}>
            <div className="mr-2 h-4 w-4 rounded-full bg-red-500" />
            <span>{t("red")}</span>
            {colorTheme === "red" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("black")}>
            <div className="mr-2 h-4 w-4 rounded-full bg-black" />
            <span>{t("black")}</span>
            {colorTheme === "black" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setColorTheme("white")}>
            <div className="mr-2 h-4 w-4 rounded-full bg-white border border-gray-200" />
            <span>{t("white")}</span>
            {colorTheme === "white" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
