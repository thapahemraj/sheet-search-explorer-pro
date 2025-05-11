
import { GOOGLE_API_KEY, SPREADSHEET_ID, DISABLE_FLAG_COLUMN } from '@/config/config';

export interface Sheet {
  id: string;
  title: string;
}

export interface SheetData {
  headers: string[];
  rows: Record<string, string>[];
}

/**
 * Fetches the list of available sheets from a Google Spreadsheet
 * @returns Promise<Sheet[]> - A promise that resolves to an array of sheet objects
 */
export async function fetchSheets(): Promise<Sheet[]> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheets');
    }
    
    const data = await response.json();
    
    return data.sheets.map((sheet: any) => ({
      id: sheet.properties.sheetId,
      title: sheet.properties.title,
    }));
  } catch (error) {
    console.error('Error fetching sheets:', error);
    throw error;
  }
}

/**
 * Fetches data from a specific sheet in a Google Spreadsheet
 * @param sheetName - The name of the sheet to fetch data from
 * @returns Promise<SheetData> - A promise that resolves to the sheet data
 */
export async function fetchSheetData(sheetName: string): Promise<SheetData> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    
    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      return { headers: [], rows: [] };
    }
    
    const headers = data.values[0];
    const rows: Record<string, string>[] = [];
    
    for (let i = 1; i < data.values.length; i++) {
      const row: Record<string, string> = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = data.values[i][j] || '';
      }
      
      // Check if this row should be included based on the disable flag
      const disableValue = DISABLE_FLAG_COLUMN ? row[DISABLE_FLAG_COLUMN]?.toLowerCase() : null;
      const isDisabled = disableValue === 'true' || disableValue === 'yes' || disableValue === '1' || disableValue === 'y';
      
      if (!isDisabled) {
        rows.push(row);
      }
    }
    
    return { headers, rows };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

/**
 * Filters sheet data based on search criteria
 * @param data - The sheet data to filter
 * @param column1 - The first column to search
 * @param value1 - The value to search for in the first column
 * @param column2 - The second column to search
 * @param value2 - The value to search for in the second column
 * @returns Record<string, string>[] - The filtered rows
 */
export function filterData(
  data: SheetData,
  column1: string,
  value1: string,
  column2: string,
  value2: string
): Record<string, string>[] {
  if (!data || !data.rows) return [];
  if (!value1 && !value2) return [];
  
  return data.rows.filter(row => {
    const matchesColumn1 = !value1 || 
      (column1 && row[column1] && row[column1].toLowerCase().includes(value1.toLowerCase()));
    const matchesColumn2 = !value2 || 
      (column2 && row[column2] && row[column2].toLowerCase().includes(value2.toLowerCase()));
    return matchesColumn1 && matchesColumn2;
  });
}
