
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsTableProps {
  headers: string[];
  data: Record<string, string>[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ headers, data }) => {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        {t("noDataFound")}
      </Card>
    );
  }

  // Filter out the disable flag column if it exists
  const visibleHeaders = headers.filter(header => header !== "Disabled");

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">
        {t("searchResults")}: {data.length} {t("rows")}
      </div>
      
      {data.map((row, rowIndex) => (
        <Card key={rowIndex} className="overflow-hidden">
          <CardHeader>
            <CardTitle>Record #{rowIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {visibleHeaders.map((header) => (
                <div key={`${rowIndex}-${header}`} className="py-2 grid grid-cols-3">
                  <div className="font-medium">{header}</div>
                  <div className="col-span-2">{row[header] || '-'}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResultsTable;
