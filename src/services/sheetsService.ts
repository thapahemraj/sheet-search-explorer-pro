
import { GOOGLE_API_KEY, SPREADSHEET_ID, DISABLE_FLAG_COLUMN, DEFAULT_SEARCH_COLUMNS, SHEET_CONFIG } from '@/config/config';

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
 * Get the search column names based on the positions defined in config for the specific sheet
 * @param headers - The headers from the spreadsheet
 * @param sheetName - The name of the sheet
 * @returns string[] - The column names to search on
 */
export function getSearchColumnNames(headers: string[], sheetName: string): string[] {
  // Get the sheet-specific search column configuration or use the default
  const searchColumns = SHEET_CONFIG[sheetName]?.searchColumns || DEFAULT_SEARCH_COLUMNS;
  
  // Get column names based on the positions defined in the config
  return searchColumns.map(column => {
    const position = column.position;
    return position < headers.length ? headers[position] : `Column ${position + 1}`;
  });
}

/**
 * Filters sheet data based on search criteria (requires all columns to match)
 * @param data - The sheet data to filter
 * @param columnNames - The column names to search
 * @param searchValues - The values to search for in each column
 * @returns Record<string, string>[] - The filtered rows
 */
export function filterData(
  data: SheetData,
  columnNames: string[],
  searchValues: string[]
): Record<string, string>[] {
  // If any search value is empty, return empty result
  if (searchValues.some(value => !value.trim())) {
    return [];
  }
  
  return data.rows.filter(row => {
    // Each column search must match
    return columnNames.every((columnName, index) => {
      const searchValue = searchValues[index];
      if (!searchValue) return true; // Skip empty search values
      return row[columnName]?.toLowerCase().includes(searchValue.toLowerCase());
    });
  });
}
