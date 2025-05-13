
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { LOGO_PATH } from "@/config/config";

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { mode, systemTheme } = useTheme();
  
  // Determine the effective theme (what's actually being applied)
  const effectiveTheme = mode === 'system' ? systemTheme : mode;
  
  return (
    <header className={`${effectiveTheme === 'dark' ? 'bg-black' : 'bg-white'} text-foreground p-4 shadow-md`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          {LOGO_PATH && (
            <img 
              src={LOGO_PATH} 
              alt="Logo" 
              className="h-8 mr-3" 
            />
          )}
        </div>
        <div className="flex space-x-4 items-center">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
