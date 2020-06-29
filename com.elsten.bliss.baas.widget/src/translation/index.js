
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
          "Embedded art": "Embedded art",
          "Missing embedded art": "Missing embedded art",
          "Image files": "Image files",
          "Art was missing from": "Art was missing from",
          "Art was found in": "Art was found in",
          "_comp_coverartpolicy_missing_embedded_title": "Embedded art",
          "_comp_coverartpolicy_missing_image-file_title": "Image files",
          "_comp_coverartpolicy_missing_detail_NONCOMPLIANT_title":"Missing",
          "_comp_coverartpolicy_missing_detail_COMPLIANT_title":"Found",
          "_comp_coverartpolicy_missing_image-file_COMPLIANT_description": "Art was found at",
          "_comp_coverartpolicy_missing_image-file_NONCOMPLIANT_description": "Art was missing at",
          "_comp_coverartpolicy_missing_embedded_COMPLIANT_description": "Embedded art was found in",
          "_comp_coverartpolicy_missing_embedded_NONCOMPLIANT_description": "Missing embedded art from",
          "_comp_coverartpolicy_missing_embedded_COMPLIANT_title": "Embedded art was found",
          "_comp_coverartpolicy_missing_embedded_NONCOMPLIANT_title": "Missing embedded art",
          "_comp_coverartpolicy_missing_image-file_COMPLIANT_title": "Art was found",
          "_comp_coverartpolicy_missing_image-file_NONCOMPLIANT_title": "Art was missing",
          "_comp_coverartpolicy_missing_embedded_COMPLIANT_detail_description": "Embedded art was found in:",
          "_comp_coverartpolicy_missing_embedded_NONCOMPLIANT_detail_description": "Missing embedded art from:",
          "_comp_coverartpolicy_missing_image-file_COMPLIANT_detail_description": "Art was found at:",
          "_comp_coverartpolicy_missing_image-file_NONCOMPLIANT_detail_description": "Art was missing at:",
          "_comp_coverartpolicy_missing_title": "Album artwork",
          "_comp_coverartpolicy_max-size_title": "Maximum artwork resolution",
          "_comp_coverartpolicy_maxdatasizebytes_title": "Maximum artwork data size",
          "_comp_coverartpolicy_img-formats_title": "Image format",
          "_comp_COMPLIANT": "Compliant",
          "_comp_NONCOMPLIANT": "Non Compliant",
          "_comp_coverartpolicy_max-size_COMPLIANT_description": "Artwork is the correct size",
          "_comp_coverartpolicy_max-size_NONCOMPLIANT_description": "Artwork is the incorrect size",
          "_comp_coverartpolicy_missing_fix_description": "To find the missing artwork for your albums",
          "_comp_coverartpolicy_img_formats_fix_description": "To fix image formats in your music library",
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