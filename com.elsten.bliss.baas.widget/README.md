# Music Tags

## Installation

```bash
npm install
```

## Development

```bash
npm start
```

Using the additional api link

```bash
npm start --endpoint=link
```

Using the additional rules

```bash
npm start --rules=rules
```

Example for rules:

```bash
--rules={\"images\":{\"storage\":{\"embedded\":\"embed\",\"imageFileNamesRelative\":[\"folder\"]},\"maxHeight\":900,\"maxWidth\":900,\"maxDataSizeBytes\":600000,\"permittedFormats\":[\"jpeg\"]}}
```

## Production

```bash
npm run build
```

## Using as widget

```html
<div id="#baas-widget"></div>
<script src="{link}/com.elsten.bliss.baas.widget.js"></script>
<script>
baasWidget.init({
  target: "#baas-widget",
  rules: {
    images: {
      storage: {
        embedded: "embed",
        imageFileNamesRelative: ["folder"]
      }
    }
  }
});
</script>
```

## Options

Required:

*   `localapi`: url to the api
*   `rules`: The app rules

Additional:

*   `title`: The app title [`string`]
*   `introHtml`: The app intro [`html`]
*   `completeHtml`: Message in the completion popup [`html`]
*   `completeLabel`: Button text in the completion popup [`string`]
*   `completeLink`: Link in the completion popup [`string`]
*   `previewStepHelpTitleHtml`: The help title for the preview help popup [`html`]
*   `previewStepHelpContentHtml`: The help message for the preview help popup [`html`]
*   `assessmentStepHelpTitleHtml`: The help title for the assesment help popup [`html`]
*   `assessmentStepHelpContentHtml`: The help message for the assesment help popup [`html`]
*   `showPoweredBy`: Copyright. [`true, false`] default `true`
*   `height`: The height of the app. [`%, px`] default `100%`

## Callbacks

*   `onFilesUploaded`: Triggers when the files uploaded. [`Returns array of uploaded files`]
*   `onAssessment`: Triggers when received the Assesment result. [`Returns result`]
*   `onFinish`: Triggers when clicked the `Fix missing artwork`.