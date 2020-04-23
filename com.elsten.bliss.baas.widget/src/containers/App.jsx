import React, { useReducer, useEffect } from "react";
import ViewsManager from "../views/ViewsManager";
import Preloader from "../components/Preloader/Preloader"
import Notification from "../components/Notification/Notification"
import { Context } from "../context/context";
import reducer from "../context/reducer";
import { appDefaultConfig } from "../defines/config";
import { useTranslation } from "react-i18next";

const App = ({ userConfig }) => {

  if(endpoint) endpoint !== '$npm_config_endpoint' ? userConfig.endpoint = endpoint : null;
  const config = { ...appDefaultConfig, ...userConfig, appWidth: userConfig.target.offsetWidth };

  const [state, dispatch] = useReducer(reducer, {
    isProcessing: false,
    isNotification: false,
    isBussy: false,
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

  useEffect(()=>{
    console.log(userConfig.target);
    userConfig.target.style.height = config.height;
  }, [])

  return (
    <div className={`baas ${config.appWidth < 991 ? config.appWidth < 520 ? 'baas-mobile' : 'baas-small' : '' }`} style={{ height: config.height }}>
      <Context.Provider value={{ dispatch, config }}>
        <Notification {...state} />
        <Preloader {...state} />
        <ViewsManager {...state} />
      </Context.Provider>
    </div>
  );
}

export default App;