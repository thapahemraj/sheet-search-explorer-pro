
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeSwitcher: React.FC = () => {
  const { mode, setMode, systemTheme } = useTheme();
  const { t } = useLanguage();
  
  // Determine which icon to show based on mode
  const getThemeIcon = () => {
    if (mode === "dark") {
      return <Moon className="h-5 w-5" />;
    } else if (mode === "light") {
      return <Sun className="h-5 w-5" />;
    } else {
      // If system mode, show icon based on system preference
      return systemTheme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 px-0">
          {getThemeIcon()}
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
            <span>{t("systemMode")} {mode === "system" && `(${systemTheme})`}</span>
            {mode === "system" && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
