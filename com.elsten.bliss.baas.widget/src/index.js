import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App.jsx";
import "./styles/ui.scss";

export const init = (config) => {
  const target = config ? config.target ? config.target : "#baas-widget" : "#baas-widget";
  ReactDOM.render(<App userConfig={{...config, target: document.querySelector(target)}} />, document.querySelector(target));
}