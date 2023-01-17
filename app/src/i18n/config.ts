import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enActivities from "./locales/en/activities.json";
import enGroups from "./locales/en/groups.json";

const resources = {
  en: {
    groups: enGroups,
    enActivities: enActivities,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
