
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "BaaS Widget": "BaaS Widget",
          "Description of the widget": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores totam harum quae, nostrum ullam sequi nemo nihil ipsum numquam pariatur fugit. Eos, aliquam saepe possimus dolorum maiores ullam animi suscipit!",
          "Drag and drop music files here": "Drag 'n' drop music files here, or click to select",
          "Processing": "Processing",
          "of": "of",
          "Albums found": "Albums found",
          "Errors (wrong files)": "Errors (wrong files)",
          "№": "№",
          "Name": "Name",
          "Filename": "Filename",
          "Unknown": "Unknown",
          "Done": "Done",
          "Alternative": "Alternative",
          "Fix": "Fix",
          "Assessing": "Assessing",
          "Assessment": "Assessment",
          "Missing embedded artwork": "Missing embedded artwork",
          "Missing": "Missing",
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;