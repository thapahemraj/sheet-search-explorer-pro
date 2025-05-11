
import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
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
    <Card className="overflow-hidden">
      <Table>
        <TableCaption>{t("searchResults")}: {data.length} {t("rows")}</TableCaption>
        <TableHeader>
          <TableRow>
            {visibleHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {visibleHeaders.map((header) => (
                <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ResultsTable;
