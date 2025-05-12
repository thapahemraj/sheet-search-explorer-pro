
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { SEARCH_COLUMNS } from "@/config/config";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  onSearch: (value1: string, value2: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const { t } = useLanguage();

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
              {SEARCH_COLUMNS.column1.label}:
            </label>
            <Input
              id="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder={SEARCH_COLUMNS.column1.label}
            />
          </div>
          <div>
            <label htmlFor="value2" className="block text-sm font-medium mb-1">
              {SEARCH_COLUMNS.column2.label}:
            </label>
            <Input
              id="value2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder={SEARCH_COLUMNS.column2.label}
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
