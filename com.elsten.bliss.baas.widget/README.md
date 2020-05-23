# Music Tags

## Installation

```bash
npm install
```

## Development

```bash
npm start
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
*   `rules`: the app rules

Additional:

*   `title`: title
*   `introHtml`: intro
*   `completeHtml`: Message in the completion popup
*   `completeLabel`: Button text in the completion popup
*   `completeLink`: Link in the completion popup
*   `previewStepHelpTitleHtml`: the app intro
*   `previewStepHelpContentHtml`: the app intro
*   `assessmentStepHelpTitleHtml`: the app intro
*   `assessmentStepHelpContentHtml`: the app intro
*   `showPoweredBy`: copyright. [`true, false`] default `true`