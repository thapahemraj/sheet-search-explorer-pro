
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SheetSelector from "@/components/SheetSelector";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import { fetchSheetData, SheetData, filterData } from "@/services/sheetsService";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    async function loadSheetData() {
      if (!selectedSheet) return;

      try {
        setLoading(true);
        const data = await fetchSheetData(selectedSheet);
        setSheetData(data);
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

  const handleSearch = (value1: string, value2: string) => {
    if (!sheetData || !sheetData.headers) return;

    if (value1.trim() === "" && value2.trim() === "") {
      setFilteredData([]);
      return;
    }

    // Get the selected columns (default to the first two if not selected)
    const column1 = sheetData.headers[0] || "";
    const column2 = sheetData.headers[1] || "";

    const filtered = filterData(sheetData, column1, value1, column2, value2);
    setFilteredData(filtered);

    if (filtered.length === 0) {
      toast({
        title: t("noDataFound"),
        description: t("tryDifferentSearch"),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">{t("selectSheet")}</h2>
              <SheetSelector onSheetSelect={handleSheetSelect} />
            </div>

            {selectedSheet && (
              <SearchForm 
                onSearch={handleSearch} 
                headers={sheetData?.headers || []} 
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

      <footer className="border-t mt-12 py-6 px-4">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Google Sheets Viewer
        </div>
      </footer>
    </div>
  );
};

export default Index;
