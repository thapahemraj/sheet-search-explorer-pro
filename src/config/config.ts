
/**
 * Google Sheet Viewer Configuration
 * 
 * This file contains all the configuration settings for the Google Sheet Viewer application.
 * Non-technical users can modify the settings below to customize the application behavior.
 */

// Google API Credentials
// Go to Google Cloud Console (https://console.cloud.google.com/) to get your API key
export const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

// Spreadsheet ID
// This is the unique identifier for your Google Spreadsheet
// You can find this in the URL of your spreadsheet:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
export const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";

// Search Columns Configuration
// Specify which two columns should be used for searching
// The keys should match the column headers exactly as they appear in your spreadsheet
export const SEARCH_COLUMNS = {
  // First search field (e.g., Name, ID, Email, etc.)
  column1: {
    key: "Name", // The exact column header name in your spreadsheet
    label: "Name", // The label to display in the search form
  },
  // Second search field
  column2: {
    key: "ID", // The exact column header name in your spreadsheet
    label: "ID Number", // The label to display in the search form
  }
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
