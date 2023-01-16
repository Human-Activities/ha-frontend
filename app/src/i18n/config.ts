import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from './locales/en/translation.json';
import translationPolish from './locales/pl/translation.json';

i18next.use(initReactI18next).init({
    lng: 'pl',
    resources: {
        en: {
            translations: translationEnglish
        },
        pl: {
            translations: translationPolish
        }
    }
});

export default i18next;