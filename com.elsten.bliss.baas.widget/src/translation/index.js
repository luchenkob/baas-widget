
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
          "Failed to start assessment": "Failed to start assessment",
          "Use existing art": "Use existing art",
          "Drag 'n' drop music files here, or click to select": "Drag 'n' drop music files here, or click to select",
          "The following files will be ignored when assessing your music:": "The following files will be ignored when assessing your music:",
          "Retrieving results": "Retrieving results",
          "Error: Unable to get Assessment": "Error: Unable to get Assessment",
          "The following files will be ignored": "The following files will be ignored:",
          "This widget is limited to assesing up to sixty music files, rounded down to the nearest full album. We ignored": "This widget is limited to assesing up to sixty music files, rounded down to the nearest full album. We ignored:",
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