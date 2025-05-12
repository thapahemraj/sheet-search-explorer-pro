
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { CUSTOM_COLUMN_LABELS } from "@/config/config";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  onSearch: (value1: string, value2: string) => void;
  columnNames: [string, string]; // The two column names to search on
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, columnNames }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const { t } = useLanguage();

  // Get display labels (either custom from config or the original header names)
  const column1Label = CUSTOM_COLUMN_LABELS.column1 || columnNames[0] || t("firstColumn");
  const column2Label = CUSTOM_COLUMN_LABELS.column2 || columnNames[1] || t("secondColumn");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value1, value2);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("search")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="value1" className="block text-sm font-medium mb-1">
              {column1Label}:
            </label>
            <Input
              id="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder={column1Label}
            />
          </div>
          <div>
            <label htmlFor="value2" className="block text-sm font-medium mb-1">
              {column2Label}:
            </label>
            <Input
              id="value2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder={column2Label}
            />
          </div>
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" /> {t("search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
