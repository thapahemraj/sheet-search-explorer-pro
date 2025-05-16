
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { SHEET_CONFIG, DEFAULT_SEARCH_COLUMNS } from "@/config/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/config/i18n";

interface SearchFormProps {
  onSearch: (values: string[]) => void;
  columnNames: string[]; // The column names to search on
  sheetName: string; // The currently selected sheet
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, columnNames, sheetName }) => {
  // Get sheet-specific search column configuration or use default
  const searchColumnsConfig = SHEET_CONFIG[sheetName]?.searchColumns || DEFAULT_SEARCH_COLUMNS;
  const [searchValues, setSearchValues] = useState<string[]>(Array(searchColumnsConfig.length).fill(""));
  const { t } = useLanguage();

  // Reset search values when column names or sheet changes
  useEffect(() => {
    setSearchValues(Array(searchColumnsConfig.length).fill(""));
  }, [columnNames, sheetName, searchColumnsConfig.length]);

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...searchValues];
    newValues[index] = value;
    setSearchValues(newValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValues);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("search")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {searchColumnsConfig.map((column, index) => {
            // Get display label (either custom from config or the original header name)
            const columnLabel = column.customLabel || 
                               (index < columnNames.length ? columnNames[index] : t(`column${index + 1}` as keyof typeof translations.en));
            
            return (
              <div key={index}>
                <label htmlFor={`value${index}`} className="block text-sm font-medium mb-1">
                  {columnLabel}:
                </label>
                <Input
                  id={`value${index}`}
                  value={searchValues[index]}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  placeholder={columnLabel}
                />
              </div>
            );
          })}
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> {t("search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
