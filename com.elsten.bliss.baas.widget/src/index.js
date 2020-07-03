import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App.jsx";
import "./styles/ui.scss";
import i18n from './translation';

export const init = (config) => {
  if (config.translation) {
    Object.keys(config.translation).forEach((key) => {
      i18n.store.data.en.translation[key] = config.translation[key]
    })
  }
  const target = config ? config.target ? config.target : "#baas-widget" : "#baas-widget";
  ReactDOM.render(<App userConfig={{ ...config, target: document.querySelector(target) }} />, document.querySelector(target));
}