import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enActivities from "./locales/en/activities.json";
import enGroups from "./locales/en/groups.json";
import enMenus from "./locales/en/menus.json";

const resources = {
  en: {
    groups: enGroups,
    activities: enActivities,
    menus: enMenus,
  },
};

const i18NextInstance = i18next.createInstance();

i18NextInstance.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export { i18NextInstance };
