import React, { useReducer, useEffect, useRef } from "react";
import ViewsManager from "../views/ViewsManager";
import Preloader from "../components/Preloader/Preloader"
import Notification from "../components/Notification/Notification"
import { Context } from "../context/context";
import reducer from "../context/reducer";
import { appDefaultConfig } from "../defines/config";
import { ThemeProvider } from "react-bootstrap";
import { _p } from "../defines/config";

const App = ({ userConfig }) => {

  if (endpoint) endpoint !== '$npm_config_endpoint' ? userConfig.endpoint = endpoint : null;
  if (rules) rules !== '$npm_config_rules' ? userConfig.rules = rules : null;

  const container = useRef();

  const config = { ...appDefaultConfig, ...userConfig, appWidth: userConfig.target.offsetWidth };

  const [state, dispatch] = useReducer(reducer, {
    isProcessing: false,
    isNotification: false,
    isBussy: false,
    isSkipAssesment: false,
    len: 0,
    cur: 0,
    files: {},
    origFiles: [],
    assessments: [],
    errors: [],
    step: 1,
    activeAlbum: '',
    activeAssessment: 0,
    processingMessage: 'Loading',
    notificationMessage: "",
    notificationType: "primary",
  }
  );

  useEffect(() => {
    userConfig.target.style.height = config.height;

    if (!config.rules) dispatch({ type: "SET_NOTIFICATION", data: { isNotification: true, notificationMessage: `400 Invalid JSON: rules are mandatory`, notificationType: "danger", isBussy: true } })
  }, [])

  return (
    <div ref={container} className={`${_p}baas ${config.appWidth < 991 ? config.appWidth < 520 ? `${_p}baas-mobile` : `${_p}baas-mobile` : ''}`} style={{ height: config.height }}>
      <Context.Provider value={{ dispatch, config, container, state }}>
        <ThemeProvider prefixes={{ btn: `${_p}btn`, container: `${_p}container`, row: `${_p}row`, col: `${_p}col`, modal: `${_p}modal`, close: `${_p}close`, notification: `${_p}notification`, alert: `${_p}alert`, badge: `${_p}badge`, card: `${_p}card`}}>
          <Notification {...state} />
          <Preloader {...state} />
          <ViewsManager {...state} />
        </ThemeProvider>
      </Context.Provider>
    </div>
  );
}

export default App;