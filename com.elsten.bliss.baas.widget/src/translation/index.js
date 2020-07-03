
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Processing": "Processing",
          "of": "of",
          "№": "№",
          "Name": "Name",
          "Unknown": "Unknown",
          "Fix": "Fix",
          "Assessment": "Assessment",
          "Failed to start assessment": "Failed to start assessment",
          "Drag 'n' drop music files here, or click to select": "Drag 'n' drop music files here, or click to select",
          "Retrieving results": "Retrieving results",
          "Error: Unable to get Assessment": "Error: Unable to get Assessment",
          "_warning_ignorefiles_description'": "The following files will be ignored:",
          "_warning_filecount_description'": "This widget is limited to assesing up to sixty music files, rounded down to the nearest full album. We ignored:",
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
          "_comp_coverartpolicy_maxdatasizebytes_COMPLIANT_description": "Artwork is under the maximum size.",
          "_comp_coverartpolicy_maxdatasizebytes_NONCOMPLIANT_description": "Artwork is too large.",
          "_comp_coverartpolicy_img-formats_title": "Image format",
          "_comp_coverartpolicy_img-formats_COMPLIANT_description": "Artwork is encoded in an acceptable format.",
          "_comp_coverartpolicy_img-formats_NONCOMPLIANT_description": "Artwork is encoded in an unacceptable format.",
          "_comp_COMPLIANT": "Compliant",
          "_comp_NONCOMPLIANT": "Non Compliant",
          "_comp_coverartpolicy_max-size_COMPLIANT_description": "Artwork is the correct size",
          "_comp_coverartpolicy_max-size_NONCOMPLIANT_description": "Artwork is the incorrect size",
          "_comp_coverartpolicy_missing_fix_description": "To find the missing artwork for your albums",
          "_comp_coverartpolicy_img_formats_fix_description": "To fix image formats in your music library",
          "_comp_artstoragecompliance_InstallImageFromUrlResponse_title": "Alternative art"
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