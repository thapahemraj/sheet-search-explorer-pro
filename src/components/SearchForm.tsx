
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FloatingLabel } from "flowbite-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEARCH_COLUMNS } from "@/config/config";

interface SearchFormProps {
  onSearch: (value1: string, value2: string) => void;
  headers: string[];
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, headers }) => {
  const [searchValue1, setSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [selectedColumn1, setSelectedColumn1] = useState(headers[0] || "");
  const [selectedColumn2, setSelectedColumn2] = useState(headers[1] || "");
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue1, searchValue2);
  };

  const handleSelectColumn1 = (column: string) => {
    setSelectedColumn1(column);
  };

  const handleSelectColumn2 = (column: string) => {
    setSelectedColumn2(column);
  };

  // Filter out any possible "Disabled" column
  const selectableHeaders = headers.filter(header => header !== "Disabled");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("search")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("firstColumn")}
            </label>
            <Select value={selectedColumn1} onValueChange={handleSelectColumn1}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectColumn")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectableHeaders.map(header => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-3">
              <FloatingLabel 
                variant="outlined" 
                value={searchValue1}
                onChange={(e) => setSearchValue1(e.target.value)}
                label={selectedColumn1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("secondColumn")}
            </label>
            <Select value={selectedColumn2} onValueChange={handleSelectColumn2}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectColumn")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectableHeaders.map(header => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-3">
              <FloatingLabel 
                variant="outlined" 
                value={searchValue2}
                onChange={(e) => setSearchValue2(e.target.value)}
                label={selectedColumn2}
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {t("search")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
