import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, hi, bn, te, ta, mr, gu, kn, ml, pa, or, ur, as } from './translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      te: { translation: te },
      ta: { translation: ta },
      mr: { translation: mr },
      gu: { translation: gu },
      kn: { translation: kn },
      ml: { translation: ml },
      pa: { translation: pa },
      or: { translation: or },
      ur: { translation: ur },
      as: { translation: as }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
