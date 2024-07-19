import { createContext, useContext } from "react";
import { Language, LanguageString } from "../utils/types";

export const LANUGAGE_ENGLISH: Language = {
  welcomeBack: "Welcome back",
};

export const LANUGAGE_RUSSIAN: Language = {
  welcomeBack: "Добро пожаловать",
};

export const LanguageContext = createContext<{
  l: (s: LanguageString, ...s2: string[]) => string,
  language: Language,
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}>({
  l: (s) => s,
  language: LANUGAGE_ENGLISH,
  setLanguage: (l) => l,
});

export function useLanguage() {
  return useContext(LanguageContext);
}
