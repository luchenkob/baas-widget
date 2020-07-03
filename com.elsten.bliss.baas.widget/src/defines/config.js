export const appDefaultConfig = {
  endpoint: "local",
  localapi: "/localapi/",
  //testID: "7c4aac6e-32bb-4e82-88f8-b48fa5094b7e",
  height: "100%",
  queryDelay: 5000,
  endTimeout: 60000,
  limitFiles: 60,
  prefix: "baasZcx-",
  showPoweredBy: true,
  previewStepHelpTitleHtml: "Scanned files",
  previewStepHelpContentHtml: "Displays the scanned files.",
  assessmentStepHelpTitleHtml: "Assessment files",
  assessmentStepHelpContentHtml: "Displays the assessment files.",
  completeHtml: "To find the missing artwork for your albums,<br/> <a href='/download.html'>download and install bliss</a>",
  completeLabel: "Download and install bliss",
  completeLink: "./download.html",
  fixHtml: "<a href='/download.html'>download and install bliss</a>",
  mimeTypes:
  {
    "aiff": "audio/aiff",
    "dsf": "audio/x-dsf",
    "flac": "audio/flac",
    "m4a": "video/mp4",
    "m4b": "video/mp4",
    "m4p": "video/mp4",
    "mp3": "audio/mpeg",
    "mp4": "video/mp4",
    "ogg": "video/ogg",
    "wav": "audio/wav",
    "wma": "audio/x-ms-wma"
  }
}

export const _p = appDefaultConfig.prefix;