
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { SEARCH_COLUMNS } from "@/config/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { FloatingLabel } from "flowbite-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFormProps {
  onSearch: (value1: string, value2: string) => void;
  headers?: string[];
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, headers = [] }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [selectedColumn1, setSelectedColumn1] = useState(SEARCH_COLUMNS.column1.key);
  const [selectedColumn2, setSelectedColumn2] = useState(SEARCH_COLUMNS.column2.key);
  const { t } = useLanguage();

  // Reset values when column selection changes
  useEffect(() => {
    setValue1("");
    setValue2("");
  }, [selectedColumn1, selectedColumn2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value1, value2);
  };

  // Get display labels for selected columns
  const getColumnLabel = (columnKey: string) => {
    if (headers.includes(columnKey)) {
      return columnKey;
    }
    return columnKey === SEARCH_COLUMNS.column1.key 
      ? SEARCH_COLUMNS.column1.label 
      : SEARCH_COLUMNS.column2.label;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("search")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Column Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("firstSearchColumn")}:
              </label>
              <Select
                value={selectedColumn1}
                onValueChange={(value) => setSelectedColumn1(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectColumn")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={SEARCH_COLUMNS.column1.key}>
                      {SEARCH_COLUMNS.column1.label} ({SEARCH_COLUMNS.column1.key})
                    </SelectItem>
                    {headers
                      .filter(header => header !== SEARCH_COLUMNS.column1.key && header !== selectedColumn2 && header !== "Disabled")
                      .map(header => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("secondSearchColumn")}:
              </label>
              <Select
                value={selectedColumn2}
                onValueChange={(value) => setSelectedColumn2(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectColumn")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={SEARCH_COLUMNS.column2.key}>
                      {SEARCH_COLUMNS.column2.label} ({SEARCH_COLUMNS.column2.key})
                    </SelectItem>
                    {headers
                      .filter(header => header !== SEARCH_COLUMNS.column2.key && header !== selectedColumn1 && header !== "Disabled")
                      .map(header => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <FloatingLabel
                variant="outlined"
                label={getColumnLabel(selectedColumn1)}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <FloatingLabel
                variant="outlined"
                label={getColumnLabel(selectedColumn2)}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full"
              />
            </div>
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
