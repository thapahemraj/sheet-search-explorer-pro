
export type Language = "en" | "ne" | "hi";

export interface Translations {
  appTitle: string;
  selectSheet: string;
  search: string;
  noDataFound: string;
  loading: string;
  error: string;
  theme: string;
  language: string;
  lightMode: string;
  darkMode: string;
  systemMode: string;
  blue: string;
  green: string;
  red: string;
  black: string;
  white: string;
  english: string;
  nepali: string;
  hindi: string;
  searchResults: string;
  rows: string;
  firstColumn: string;
  secondColumn: string;
  tryDifferentSearch: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  [key: `column${number}`]: string; // Add index signature for dynamic column keys
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: "Google Sheet Viewer",
    selectSheet: "Select Sheet",
    search: "Search",
    noDataFound: "No data found",
    loading: "Loading...",
    error: "An error occurred",
    theme: "Theme",
    language: "Language",
    lightMode: "Light",
    darkMode: "Dark",
    systemMode: "System",
    blue: "Blue",
    green: "Green",
    red: "Red",
    black: "Black",
    white: "White",
    english: "English",
    nepali: "Nepali",
    hindi: "Hindi",
    searchResults: "Search Results",
    rows: "rows",
    firstColumn: "First Column",
    secondColumn: "Second Column",
    tryDifferentSearch: "Please try a different search query.",
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  },
  ne: {
    appTitle: "गुगल सिट भ्युअर",
    selectSheet: "सिट चयन गर्नुहोस्",
    search: "खोज्नुहोस्",
    noDataFound: "डाटा फेला परेन",
    loading: "लोड हुँदैछ...",
    error: "त्रुटि भयो",
    theme: "थिम",
    language: "भाषा",
    lightMode: "उज्यालो",
    darkMode: "अँध्यारो",
    systemMode: "प्रणाली",
    blue: "निलो",
    green: "हरियो",
    red: "रातो",
    black: "कालो",
    white: "सेतो",
    english: "अंग्रेजी",
    nepali: "नेपाली",
    hindi: "हिन्दी",
    searchResults: "खोज परिणामहरू",
    rows: "पंक्तिहरू",
    firstColumn: "पहिलो स्तम्भ",
    secondColumn: "दोस्रो स्तम्भ",
    tryDifferentSearch: "कृपया फरक खोज प्रश्न प्रयास गर्नुहोस्।",
    column1: "स्तम्भ १",
    column2: "स्तम्भ २",
    column3: "स्तम्भ ३",
    column4: "स्तम्भ ४",
    column5: "स्तम्भ ५",
  },
  hi: {
    appTitle: "गूगल शीट व्यूअर",
    selectSheet: "शीट का चयन करें",
    search: "खोज",
    noDataFound: "कोई डेटा नहीं मिला",
    loading: "लोड हो रहा है...",
    error: "एक त्रुटि हुई",
    theme: "थीम",
    language: "भाषा",
    lightMode: "रोशनी",
    darkMode: "अंधेरा",
    systemMode: "सिस्टम",
    blue: "नीला",
    green: "हरा",
    red: "लाल",
    black: "काला",
    white: "सफेद",
    english: "अंग्रेज़ी",
    nepali: "नेपाली",
    hindi: "हिंदी",
    searchResults: "खोज परिणाम",
    rows: "पंक्तियां",
    firstColumn: "पहला कॉलम",
    secondColumn: "दूसरा कॉलम",
    tryDifferentSearch: "कृपया एक अलग खोज प्रश्न का प्रयास करें।",
    column1: "कॉलम १",
    column2: "कॉलम २",
    column3: "कॉलम ३",
    column4: "कॉलम ४",
    column5: "कॉलम ५",
  }
};
