
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {

          "Scanned files": "Scanned files",
          "Displays the scanned files.": "Displays the scanned files.",
          "Assessment files": "Assessment files",
          "Displays the assessment files.": "Displays the assessment files.",
          "Download and install bliss": "Download and install bliss",

          "uploader_uploader_cta": "Drag 'n' drop music files here, or click to select",
          "uploader_missed_album_title": "Unknown",
          
          "notification_processing_title": "Processing",
          "notification_processing_separator": "of",
          "notification_empty_files": "Please choose files",
          "notification_limit_part_1": "audio files have been chosen. We limit this demo to the assessment of",
          "notification_limit_part_2": "audio files, so we'll just send up to that number, whole albums only.",
          "notification_assessment_failed_start": "Failed to start assessment",
          "notification_assessment_failed_get": "Error: Unable to get Assessment",
          "notification_submitting": "Submitting music for assessment",
          "notification_checking": "Checking for missing artwork",

          "result_list_header_num": "№",
          "result_list_header_name": "Name",
          "result_header_part_1": "Found",
          "result_header_part_2": "album",
          "result_header_part_3": "albums",
          "result_nav_cancel": "Choose files",
          "result_nav_next": "Find missing artwork",
          "result_modal_detail_title": "Track details",
          "result_modal_scanning_title": "Scanning issues",
          "result_list_disk": "Disk",
          "result_list_nodisk": "[no disk number]",

          "assessment_modal_detail_title": "The compliance details",
          "assessment_header_title": "Assessment",
          "assessment_processing_retrieving": "Retrieving results",
          "assessment_list_other_fixes": "Other fixes",
          "assessment_list_fix": "Fix",

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