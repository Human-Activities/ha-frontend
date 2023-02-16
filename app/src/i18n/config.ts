import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enActivities from "./locales/en/activities.json";
import enGroups from "./locales/en/groups.json";
import enMenus from "./locales/en/menus.json";
import enFinances from "./locales/en/finances.json";

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      [key: string]: {
        [key: string]: string;
      };
    };
    returnNull: false;
  }
}

const resources = {
  en: {
    groups: enGroups,
    activities: enActivities,
    menus: enMenus,
    finances: enFinances,
  },
};

const i18NextInstance = i18next.createInstance();

i18NextInstance.use(initReactI18next).init({
  resources,
  returnNull: false,
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export { i18NextInstance };
