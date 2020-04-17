import React, { useReducer } from "react";
import ViewsManager from "../views/ViewsManager";
import Preloader from "../components/Preloader/Preloader"
import Notification from "../components/Notification/Notification"
import { Context } from "../context/context";
import reducer from "../context/reducer";
import {appDefaultConfig} from "../defines/config";

const App = ({userConfig}) => {

  const config = {...appDefaultConfig, ...userConfig};

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

  return (
    <div className="baas" style={{height: config.height}}>
      <Context.Provider value={{ dispatch, config }}>
        <Notification {...state} />
        <Preloader {...state} />
        <ViewsManager {...state} />
      </Context.Provider>
    </div>
  );
}

export default App;