export interface Translations {
  Common: {
    switchLanguage: string;
    spanish: string;
    english: string;
  };
  NotFound: {
    title: string;
    description: string;
  };
  Home: {
    pageTitle: string;
    title: string;
    description: string;
    variable: string;
    success: string;
    switchLanguage: string;
    spanish: string;
    english: string;
    footer: string;
  };
}

export type TranslationKeys<T> = keyof T;
