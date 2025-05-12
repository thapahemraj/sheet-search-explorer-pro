
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
        
        // Only set the default sheet if no sheet is currently selected
        if (!selectedSheet) {
          // Select the default sheet if specified and it exists in the sheets data
          if (DEFAULT_SHEET_NAME) {
            const defaultSheetExists = sheetsData.some(sheet => sheet.title === DEFAULT_SHEET_NAME);
            if (defaultSheetExists) {
              setSelectedSheet(DEFAULT_SHEET_NAME);
              onSheetSelect(DEFAULT_SHEET_NAME);
              console.log("Selected default sheet:", DEFAULT_SHEET_NAME);
              return;
            }
          }
          
          // If default sheet doesn't exist or none specified, select the first sheet
          if (sheetsData.length > 0) {
            setSelectedSheet(sheetsData[0].title);
            onSheetSelect(sheetsData[0].title);
            console.log("Selected first sheet:", sheetsData[0].title);
          }
        }
      } catch (err) {
        setError("Failed to load sheets. Please check your API key and spreadsheet ID.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSheets();
  }, [onSheetSelect, selectedSheet]);

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
