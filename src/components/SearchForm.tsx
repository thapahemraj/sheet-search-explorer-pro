
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { SEARCH_COLUMNS } from "@/config/config";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  onSearch: (values: string[]) => void;
  columnNames: string[]; // The column names to search on
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, columnNames }) => {
  const [searchValues, setSearchValues] = useState<string[]>(Array(SEARCH_COLUMNS.length).fill(""));
  const { t } = useLanguage();

  // Reset search values when column names change
  useEffect(() => {
    setSearchValues(Array(SEARCH_COLUMNS.length).fill(""));
  }, [columnNames]);

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
          {SEARCH_COLUMNS.map((column, index) => {
            // Get display label (either custom from config or the original header name)
            const columnLabel = column.customLabel || 
                               (index < columnNames.length ? columnNames[index] : t(`column${index + 1}`));
            
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
