
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SheetSelector from "@/components/SheetSelector";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import { 
  fetchSheetData, SheetData, filterData, getSearchColumnNames
} from "@/services/sheetsService";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchColumnNames, setSearchColumnNames] = useState<string[]>([]);
  const { t } = useLanguage();
  const { mode, systemTheme } = useTheme();
  
  // Determine the effective theme (what's actually being applied)
  const effectiveTheme = mode === 'system' ? systemTheme : mode;

  useEffect(() => {
    async function loadSheetData() {
      if (!selectedSheet) return;

      try {
        setLoading(true);
        const data = await fetchSheetData(selectedSheet);
        setSheetData(data);
        
        // Set the search column names based on the headers and selected sheet
        setSearchColumnNames(getSearchColumnNames(data.headers, selectedSheet));
        
        setFilteredData([]); // Reset filtered data when sheet changes
      } catch (error) {
        console.error("Error loading sheet data:", error);
        toast({
          title: t("error"),
          description: String(error),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    loadSheetData();
  }, [selectedSheet, t]);

  const handleSheetSelect = (sheetName: string) => {
    setSelectedSheet(sheetName);
  };

  const handleSearch = (searchValues: string[]) => {
    if (!sheetData || searchColumnNames.length === 0) return;

    if (searchValues.some(value => value.trim() === "")) {
      setFilteredData([]);
      toast({
        title: t("noDataFound"),
        description: t("tryDifferentSearch"),
      });
      return;
    }

    const filtered = filterData(
      sheetData, 
      searchColumnNames, 
      searchValues
    );
    
    setFilteredData(filtered);

    if (filtered.length === 0) {
      toast({
        title: t("noDataFound"),
        description: t("tryDifferentSearch"),
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t("selectSheet")}</h2>
              <SheetSelector onSheetSelect={handleSheetSelect} />
            </div>

            {selectedSheet && (
              <SearchForm 
                onSearch={handleSearch} 
                columnNames={searchColumnNames}
                sheetName={selectedSheet}
              />
            )}
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-lg text-muted-foreground">{t("loading")}</p>
              </div>
            ) : (
              <>
                {sheetData && filteredData.length > 0 && (
                  <ResultsTable headers={sheetData.headers} data={filteredData} />
                )}
                {sheetData && filteredData.length === 0 && (
                  <div className="h-40 flex items-center justify-center text-muted-foreground">
                    {t("noDataFound")}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className={`${effectiveTheme === 'dark' ? 'bg-black' : 'bg-white'} border-t p-4 shadow-md mt-auto`}>
        <div className="container mx-auto text-center text-foreground text-sm font-light">
          &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
