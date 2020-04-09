import React, {useReducer } from "react";
import ViewsManager from "../views/ViewsManager";
import Preloader from "../components/Preloader/Preloader"
import Notification from "../components/Notification/Notification"
import { Context } from "../context/context";
import reducer from "../context/reducer";

const App = () => {

  const [state, dispatch] = useReducer(reducer, { 
    isProcessing: false,
    isNotification: false,
    isBussy: false,
    len: 0,
    cur: 0,
    files: {},
    origFiles:[],
    errors: [],
    step:1,
    activeAlbum: '',
    processingMessage: 'Loading',
    notificationMessage: "",
    notificationType: "primary" }
    );

  return (
    <Context.Provider value={{dispatch}}>
      <Notification {...state}/>
      <Preloader {...state}/>
      <ViewsManager {...state}/>
    </Context.Provider>
  );
}

export default App;