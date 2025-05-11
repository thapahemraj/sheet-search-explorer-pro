
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchSheets, Sheet } from "@/services/sheetsService";
import { useLanguage } from "@/contexts/LanguageContext";

interface SheetSelectorProps {
  onSheetSelect: (sheetName: string) => void;
}

const SheetSelector: React.FC<SheetSelectorProps> = ({ onSheetSelect }) => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const getSheets = async () => {
      try {
        setLoading(true);
        const sheetsData = await fetchSheets();
        setSheets(sheetsData);
        setError(null);
        
        // Auto-select the first sheet if available
        if (sheetsData.length > 0) {
          onSheetSelect(sheetsData[0].title);
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
    <Select onValueChange={onSheetSelect}>
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
