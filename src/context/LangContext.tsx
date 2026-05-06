import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import '../i18n';
import i18n from '../i18n';
import { TranslationKey } from '../translations';

export type Lang = 'fr' | 'en';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key) => key as string,
});

function resolvedLang(): Lang {
  const detected = i18n.language || 'fr';
  return detected.startsWith('en') ? 'en' : 'fr';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(resolvedLang);

  const setLang = (newLang: Lang) => {
    i18n.changeLanguage(newLang);
    setLangState(newLang);
  };

  useEffect(() => {
    const onChanged = (lng: string) => {
      setLangState(lng.startsWith('en') ? 'en' : 'fr');
    };
    i18n.on('languageChanged', onChanged);
    return () => { i18n.off('languageChanged', onChanged); };
  }, []);

  const t = (key: TranslationKey): string => i18n.t(key);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
