
/**
 * Google Sheet Viewer Configuration
 * 
 * This file contains all the configuration settings for the Google Sheet Viewer application.
 * Non-technical users can modify the settings below to customize the application behavior.
 */

// Google API Credentials
// Go to Google Cloud Console (https://console.cloud.google.com/) to get your API key
export const GOOGLE_API_KEY = "AIzaSyA0OiVh0_l42LuY_booD8NLRPD6o3M8O78";

// Spreadsheet ID
// This is the unique identifier for your Google Spreadsheet
// You can find this in the URL of your spreadsheet:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
export const SPREADSHEET_ID = "1VvBc-6z-5ViSZfCxNYjV9MWvLtJ62kDG_S5tzJi26l0";

// Dynamic Search Configuration
// Setting to determine which columns to use for search (by position)
// First column = 0, Second column = 1, and so on
export const SEARCH_COLUMN_POSITIONS = {
  column1: 0, // Position of first search column (index starts at 0)
  column2: 1  // Position of second search column (index starts at 1)
};

// Custom Column Labels (Optional)
// If provided, these will override the actual column names in the UI
// Set to null to use the original column names from the spreadsheet
export const CUSTOM_COLUMN_LABELS = {
  column1: null, // Custom label for the first search column (null = use original name)
  column2: null  // Custom label for the second search column (null = use original name)
};

// Disable Flag Column (Optional)
// If your spreadsheet has a column that should be used to hide certain rows,
// specify the column header name here. Rows with "true", "yes", "1", or "y" in this column
// will be hidden from results even if they match the search criteria.
// Set to null or empty string if you don't want to use this feature.
export const DISABLE_FLAG_COLUMN = "Disabled";

// Application Theme Configuration
export const DEFAULT_THEME = "system"; // Options: "light", "dark", "system"
export const DEFAULT_COLOR = "blue"; // Options: "blue", "green", "red", "black", "white"
export const DEFAULT_LANGUAGE = "en"; // Options: "en" (English), "ne" (Nepali), "hi" (Hindi)

// Display Configuration
export const ROWS_PER_PAGE = 10; // Number of rows to display per page
