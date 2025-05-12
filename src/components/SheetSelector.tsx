
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSheets, Sheet } from "@/services/sheetsService";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEFAULT_SHEET_NAME } from "@/config/config";

interface SheetSelectorProps {
  onSheetSelect: (sheetName: string) => void;
}

const SheetSelector: React.FC<SheetSelectorProps> = ({ onSheetSelect }) => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const { t } = useLanguage();

  useEffect(() => {
    const getSheets = async () => {
      try {
        setLoading(true);
        const sheetsData = await fetchSheets();
        setSheets(sheetsData);
        setError(null);
        
        // Select the default sheet if specified, otherwise select the first sheet
        const defaultSheet = DEFAULT_SHEET_NAME && sheetsData.find(s => s.title === DEFAULT_SHEET_NAME);
        const sheetToSelect = defaultSheet ? defaultSheet.title : (sheetsData.length > 0 ? sheetsData[0].title : "");
        
        if (sheetToSelect) {
          setSelectedSheet(sheetToSelect);
          onSheetSelect(sheetToSelect);
        }
      } catch (err) {
        setError("Failed to load sheets. Please check your API key and spreadsheet ID.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSheets();
  }, [onSheetSelect]);

  const handleSheetChange = (value: string) => {
    setSelectedSheet(value);
    onSheetSelect(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-10">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-sm p-2">
        {error}
      </div>
    );
  }

  return (
    <Select value={selectedSheet} onValueChange={handleSheetChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t("selectSheet")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sheets.map((sheet) => (
            <SelectItem key={sheet.id} value={sheet.title}>
              {sheet.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SheetSelector;
